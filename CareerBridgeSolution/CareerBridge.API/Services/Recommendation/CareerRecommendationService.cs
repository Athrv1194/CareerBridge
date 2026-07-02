using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CareerBridge.API.DTOs.Recommendation;
using CareerBridge.API.Enums;
using CareerBridge.API.Models;
using CareerBridge.API.Repositories.Recommendation;
using CareerBridge.API.Services.Profile;
using CareerBridge.API.Responses;

namespace CareerBridge.API.Services.Recommendation
{
    public class CareerRecommendationService : ICareerRecommendationService
    {
        private readonly ICareerRecommendationRepository _repository;
        private readonly IStudentProfileService _profileService;

        public CareerRecommendationService(ICareerRecommendationRepository repository, IStudentProfileService profileService)
        {
            _repository = repository;
            _profileService = profileService;
        }

        public async Task<ApiResponse<object>> GenerateRecommendationAsync(int userId)
        {
            var profileResult = await _profileService.GetProfileAsync(userId);
            if (!profileResult.Success || profileResult.Data == null || profileResult.Data.ProfileCompletionPercentage < 80)
            {
                return new ApiResponse<object>
                {
                    Success = false,
                    Message = "Profile must be completed first.",
                    StatusCode = 400
                };
            }

            var assessment = await _repository.GetLatestAssessmentAsync(userId);
            if (assessment == null || !assessment.Completed)
            {
                return new ApiResponse<object>
                {
                    Success = false,
                    Message = "Assessment must be completed first.",
                    StatusCode = 400
                };
            }

            // The Recommendation row was created in Prompt 6 (Assessment logic). 
            // We just need to load it, generate explanations, and initialize the roadmap/placement.
            var recommendation = await _repository.GetLatestRecommendationAsync(userId);
            if (recommendation == null)
            {
                return new ApiResponse<object>
                {
                    Success = false,
                    Message = "Career Recommendation not found for this assessment.",
                    StatusCode = 404
                };
            }

            var careerPath = await _repository.GetCareerPathWithSkillsAndStepsAsync(recommendation.CareerPathId);
            if (careerPath == null)
            {
                return new ApiResponse<object>
                {
                    Success = false,
                    Message = "Career Path Not Found",
                    StatusCode = 404
                };
            }

            // Generate Explanations dynamically based on Career Path and Assessment Answers
            var answeredCategories = assessment.Answers
                .Select(a => a.Option?.Question?.Category ?? "Interests")
                .Distinct()
                .ToList();

            var strengthsStr = string.Join(", ", answeredCategories);

            recommendation.RecommendationReason = $"Based on your strong affinity for {strengthsStr} and your specific technical interests, {careerPath.Title} is the most suitable career path. You demonstrated analytical thinking and consistency that aligns with {careerPath.IndustryDemand} industry demand.";
            
            await _repository.SaveRecommendationTransactionAsync(recommendation);
            
            // Note: In a real system we would inject IRoadmapService and call StartRoadmapAsync here, 
            // but to avoid circular dependencies in this simplified architecture, 
            // the POST /api/roadmap/start endpoint will be called sequentially by the frontend.


            return new ApiResponse<object>
            {
                Success = true,
                Message = "Career Recommendation generated successfully.",
                StatusCode = 200,
                Data = new { generated = true }
            };
        }

        public async Task<ApiResponse<RecommendationResponseDto>> GetRecommendationAsync(int userId)
        {
            var recommendation = await _repository.GetLatestRecommendationAsync(userId);
            if (recommendation == null)
            {
                return new ApiResponse<RecommendationResponseDto>
                {
                    Success = false,
                    Message = "Please complete Career Assessment first.",
                    StatusCode = 404
                };
            }

            var careerPath = await _repository.GetCareerPathWithSkillsAndStepsAsync(recommendation.CareerPathId);
            if (careerPath == null)
            {
                return new ApiResponse<RecommendationResponseDto>
                {
                    Success = false,
                    Message = "Career Not Found",
                    StatusCode = 404
                };
            }

            var roadmap = await _repository.GetRoadmapByUserIdAsync(userId);
            var placementReadiness = await _repository.GetPlacementReadinessAsync(userId);

            var assessment = await _repository.GetLatestAssessmentAsync(userId);
            
            // Extract Strengths and Category Scores from assessment options
            var strengths = new List<string>();
            var categoryScores = new List<CategoryScoreDto>();

            if (assessment != null && assessment.Answers != null)
            {
                var answersWithOption = assessment.Answers.Where(a => a.Option != null && a.Option.Question != null).ToList();
                
                var uniqueStrengths = answersWithOption
                    .Select(a => a.Option.OptionText)
                    .Distinct()
                    .Take(4)
                    .ToList();
                strengths.AddRange(uniqueStrengths);

                var groupedByCategory = answersWithOption.GroupBy(a => a.Option.Question.Category);
                foreach (var group in groupedByCategory)
                {
                    int avgWeight = (int)group.Average(a => a.Option.Weight);
                    int scorePct = Math.Min(98, 70 + (avgWeight * 5)); 
                    
                    categoryScores.Add(new CategoryScoreDto
                    {
                        Label = string.IsNullOrWhiteSpace(group.Key) ? "General Aptitude" : group.Key,
                        Percentage = scorePct
                    });
                }
            }
            
            if (!strengths.Any())
            {
                strengths.Add("Logical thinking");
                strengths.Add("Problem solving ability");
            }

            if (!categoryScores.Any())
            {
                categoryScores.Add(new CategoryScoreDto { Label = "Programming Logic", Percentage = 85 });
                categoryScores.Add(new CategoryScoreDto { Label = "Technical Aptitude", Percentage = 90 });
            }

            var allPaths = await _repository.GetAllCareerPathsAsync();
            var alternatives = allPaths
                .Where(p => p.Id != recommendation.CareerPathId)
                .Take(3)
                .Select((p, index) => new AlternativeCareerDto
                {
                    CareerId = p.Id,
                    Title = p.Title,
                    Description = p.Description,
                    IndustryDemand = p.IndustryDemand,
                    AverageSalary = $"₹{p.AverageSalary} LPA",
                    EstimatedDuration = $"{p.DurationMonths} Months",
                    MatchPercentage = Math.Max(50, (int)recommendation.MatchPercentage - (10 * (index + 1)))
                }).ToList();

            var roadmapSteps = careerPath.RoadmapSteps != null 
                ? careerPath.RoadmapSteps
                    .OrderBy(s => s.LearningOrder)
                    .Take(4)
                    .Select(s => new RoadmapStepDto
                    {
                        StepNumber = s.LearningOrder,
                        Duration = s.EstimatedHours > 0 ? $"Week {s.LearningOrder}-{s.LearningOrder + (s.EstimatedHours / 20)}" : $"Week {s.LearningOrder}",
                        Title = s.Title,
                        Subtitle = s.Description.Length > 40 ? s.Description.Substring(0, 37) + "..." : s.Description
                    }).ToList()
                : new List<RoadmapStepDto>();

            var dto = new RecommendationResponseDto
            {
                CareerId = recommendation.CareerPathId,
                CareerTitle = careerPath.Title,
                CareerDescription = careerPath.Description,
                IndustryDemand = careerPath.IndustryDemand,
                AverageSalary = $"₹{careerPath.AverageSalary} LPA", // Simplified currency format
                EstimatedDuration = $"{careerPath.DurationMonths} Months",
                MatchPercentage = (int)recommendation.MatchPercentage,
                RecommendationReason = recommendation.RecommendationReason,
                Strengths = strengths,
                CategoryScores = categoryScores,
                RecommendedSkills = careerPath.CareerPathSkills.Select(cs => cs.Skill?.Name ?? "").Where(n => !string.IsNullOrEmpty(n)).ToList(),
                RoadmapId = roadmap?.Id ?? 0,
                RoadmapSteps = roadmapSteps,
                PlacementReadinessScore = placementReadiness?.OverallScore ?? 0,
                CreatedAt = recommendation.GeneratedAt,
                NextStep = "Roadmap",
                Alternatives = alternatives
            };

            return new ApiResponse<RecommendationResponseDto>
            {
                Success = true,
                Message = "Career Recommendation loaded successfully.",
                StatusCode = 200,
                Data = dto
            };
        }

        private int CalculateOverallPlacementScore(PlacementReadiness pr)
        {
            // Simple weighted average for initialization
            return (int)(pr.AssessmentScore * 0.4 + pr.RoadmapScore * 0.3 + pr.SkillScore * 0.2 + pr.ProjectScore * 0.1);
        }
    }
}
