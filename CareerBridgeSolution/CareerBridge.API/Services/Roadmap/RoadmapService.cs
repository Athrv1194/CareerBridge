using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CareerBridge.API.DTOs.Roadmap;
using CareerBridge.API.Enums;
using CareerBridge.API.Models;
using CareerBridge.API.Repositories.Roadmap;
using CareerBridge.API.Responses;

namespace CareerBridge.API.Services.Roadmap
{
    public class RoadmapService : IRoadmapService
    {
        private readonly IRoadmapRepository _repository;

        public RoadmapService(IRoadmapRepository repository)
        {
            _repository = repository;
        }

        public async Task<ApiResponse<object>> StartRoadmapAsync(int userId)
        {
            var recommendation = await _repository.GetLatestRecommendationAsync(userId);
            if (recommendation == null)
            {
                return new ApiResponse<object>
                {
                    Success = false,
                    Message = "Complete Career Recommendation first.",
                    StatusCode = 400
                };
            }

            var careerPath = await _repository.GetCareerPathWithStepsAsync(recommendation.CareerPathId);
            if (careerPath == null)
            {
                return new ApiResponse<object>
                {
                    Success = false,
                    Message = "Career Path Not Found.",
                    StatusCode = 404
                };
            }

            var assessment = await _repository.GetLatestAssessmentAsync(userId);
            var knownSkills = new HashSet<string>(StringComparer.OrdinalIgnoreCase);

            if (assessment != null && assessment.Answers != null)
            {
                foreach (var ans in assessment.Answers)
                {
                    if (ans.Option != null && !string.IsNullOrWhiteSpace(ans.Option.OptionText))
                    {
                        knownSkills.Add(ans.Option.OptionText);
                    }
                }
            }

            var roadmap = new Models.Roadmap
            {
                UserId = userId,
                CareerPathId = careerPath.Id,
                CreatedAt = DateTime.UtcNow,
                LastUpdated = DateTime.UtcNow
            };

            var userRoadmapProgressList = new List<UserRoadmapProgress>();
            foreach (var step in careerPath.RoadmapSteps.OrderBy(s => s.LearningOrder))
            {
                // Skill Comparison Logic
                bool isKnown = knownSkills.Contains(step.Title);
                
                userRoadmapProgressList.Add(new UserRoadmapProgress
                {
                    UserId = userId,
                    RoadmapStepId = step.Id,
                    Status = isKnown ? RoadmapStatus.Completed : RoadmapStatus.NotStarted,
                    CompletedDate = isKnown ? DateTime.UtcNow : (DateTime?)null
                });
            }

            // Calculate Initial Progress
            int totalSteps = userRoadmapProgressList.Count;
            int completedSteps = userRoadmapProgressList.Count(p => p.Status == RoadmapStatus.Completed || p.Status == RoadmapStatus.Verified);
            int roadmapScore = totalSteps == 0 ? 0 : (completedSteps * 100) / totalSteps;

            var placementReadiness = await _repository.GetPlacementReadinessAsync(userId) ?? new PlacementReadiness { UserId = userId };
            placementReadiness.AssessmentScore = (int)recommendation.MatchPercentage;
            placementReadiness.RoadmapScore = roadmapScore;
            placementReadiness.CalculatedOn = DateTime.UtcNow;
            placementReadiness.OverallScore = (int)(placementReadiness.AssessmentScore * 0.4 + placementReadiness.RoadmapScore * 0.3 + placementReadiness.SkillScore * 0.2 + placementReadiness.ProjectScore * 0.1);

            await _repository.SaveRoadmapTransactionAsync(roadmap, userRoadmapProgressList, placementReadiness);

            return new ApiResponse<object>
            {
                Success = true,
                Message = "Personalized Roadmap generated successfully.",
                StatusCode = 200,
                Data = new { generated = true }
            };
        }

        public async Task<ApiResponse<RoadmapResponseDto>> GetRoadmapAsync(int userId)
        {
            var roadmap = await _repository.GetRoadmapByUserIdAsync(userId);
            if (roadmap == null || roadmap.CareerPath == null)
            {
                return new ApiResponse<RoadmapResponseDto>
                {
                    Success = false,
                    Message = "Personalized Roadmap not found.",
                    StatusCode = 404
                };
            }

            var progressList = await _repository.GetRoadmapProgressAsync(userId);
            
            int totalSteps = progressList.Count;
            int completedSteps = progressList.Count(p => p.Status == RoadmapStatus.Completed || p.Status == RoadmapStatus.Verified);
            int overallProgress = totalSteps == 0 ? 0 : (completedSteps * 100) / totalSteps;

            var currentStep = progressList.FirstOrDefault(p => p.Status != RoadmapStatus.Completed && p.Status != RoadmapStatus.Verified);

            var currentSkill = currentStep?.RoadmapStep?.Title ?? "All Completed";

            // Calculate Estimated Completion based on remaining NotStarted or Learning steps
            int remainingHours = progressList
                .Where(p => p.Status != RoadmapStatus.Completed && p.Status != RoadmapStatus.Verified)
                .Sum(p => p.RoadmapStep?.EstimatedHours ?? 0);
            
            // Assume 10 hours a week learning capacity -> ~40 hours a month
            int remainingMonths = (int)Math.Ceiling(remainingHours / 40.0);
            string estimatedCompletion = remainingMonths > 0 ? $"{remainingMonths} Months" : "Ready for Placement";

            var skillsDto = progressList.Select(p => new RoadmapSkillDto
            {
                RoadmapStepId = p.RoadmapStepId,
                SkillName = p.RoadmapStep?.Title ?? string.Empty,
                Status = p.Status.ToString(),
                EstimatedDays = (p.RoadmapStep?.EstimatedHours ?? 0) / 2, // Assume 2 hours a day
                Order = p.RoadmapStep?.LearningOrder ?? 0
            }).ToList();

            var dto = new RoadmapResponseDto
            {
                CareerId = roadmap.CareerPathId,
                CareerTitle = roadmap.CareerPath.Title,
                OverallProgress = overallProgress,
                CurrentSkill = currentSkill,
                EstimatedCompletion = estimatedCompletion,
                Skills = skillsDto
            };

            return new ApiResponse<RoadmapResponseDto>
            {
                Success = true,
                Message = "Personalized Roadmap loaded successfully.",
                StatusCode = 200,
                Data = dto
            };
        }

        public async Task<ApiResponse<CurrentLearningDto>> GetCurrentLearningAsync(int userId)
        {
            var progressList = await _repository.GetRoadmapProgressAsync(userId);
            if (!progressList.Any())
            {
                return new ApiResponse<CurrentLearningDto>
                {
                    Success = false,
                    Message = "Roadmap not found.",
                    StatusCode = 404
                };
            }

            var currentStep = progressList.FirstOrDefault(p => p.Status != RoadmapStatus.Completed && p.Status != RoadmapStatus.Verified);

            int totalSteps = progressList.Count;
            int completedSteps = progressList.Count(p => p.Status == RoadmapStatus.Completed || p.Status == RoadmapStatus.Verified);
            int overallProgress = totalSteps == 0 ? 0 : (completedSteps * 100) / totalSteps;

            var dto = new CurrentLearningDto
            {
                Skill = currentStep?.RoadmapStep?.Title ?? "All Completed",
                Status = currentStep?.Status.ToString() ?? "Completed",
                Progress = overallProgress
            };

            return new ApiResponse<CurrentLearningDto>
            {
                Success = true,
                Message = "Current learning loaded.",
                StatusCode = 200,
                Data = dto
            };
        }

        public async Task<ApiResponse<RoadmapProgressDto>> GetProgressAsync(int userId)
        {
            var progressList = await _repository.GetRoadmapProgressAsync(userId);
            if (!progressList.Any())
            {
                return new ApiResponse<RoadmapProgressDto>
                {
                    Success = false,
                    Message = "Roadmap not found.",
                    StatusCode = 404
                };
            }

            int totalSteps = progressList.Count;
            int completedSteps = progressList.Count(p => p.Status == RoadmapStatus.Completed || p.Status == RoadmapStatus.Verified);
            int percentage = totalSteps == 0 ? 0 : (completedSteps * 100) / totalSteps;

            return new ApiResponse<RoadmapProgressDto>
            {
                Success = true,
                Message = "Progress loaded.",
                StatusCode = 200,
                Data = new RoadmapProgressDto
                {
                    Completed = completedSteps,
                    Total = totalSteps,
                    Percentage = percentage
                }
            };
        }

        public async Task<ApiResponse<object>> UpdateStatusAsync(int userId, StatusUpdateDto dto)
        {
            if (!Enum.TryParse<RoadmapStatus>(dto.Status, true, out var parsedStatus))
            {
                return new ApiResponse<object>
                {
                    Success = false,
                    Message = "Invalid Status",
                    StatusCode = 400
                };
            }

            var success = await _repository.UpdateProgressStatusAsync(userId, dto.RoadmapStepId, parsedStatus);
            if (!success)
            {
                return new ApiResponse<object>
                {
                    Success = false,
                    Message = "Roadmap step not found.",
                    StatusCode = 404
                };
            }

            // Sync PlacementReadiness
            var progressList = await _repository.GetRoadmapProgressAsync(userId);
            int totalSteps = progressList.Count;
            int completedSteps = progressList.Count(p => p.Status == RoadmapStatus.Completed || p.Status == RoadmapStatus.Verified);
            int roadmapScore = totalSteps == 0 ? 0 : (completedSteps * 100) / totalSteps;

            var pr = await _repository.GetPlacementReadinessAsync(userId);
            if (pr != null)
            {
                pr.RoadmapScore = roadmapScore;
                pr.OverallScore = (int)(pr.AssessmentScore * 0.4 + pr.RoadmapScore * 0.3 + pr.SkillScore * 0.2 + pr.ProjectScore * 0.1);
                await _repository.SavePlacementReadinessAsync(pr);
            }

            return new ApiResponse<object>
            {
                Success = true,
                Message = "Roadmap progress updated successfully.",
                StatusCode = 200,
                Data = new { updated = true }
            };
        }
    }
}
