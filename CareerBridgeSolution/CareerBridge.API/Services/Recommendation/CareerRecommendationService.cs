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
            
            // Extract Strengths from assessment options
            var strengths = new List<string>();
            if (assessment != null && assessment.Answers != null)
            {
                var uniqueStrengths = assessment.Answers
                    .Select(a => a.Option?.OptionText ?? "General Aptitude")
                    .Take(4)
                    .ToList();
                strengths.AddRange(uniqueStrengths);
            }
            if (!strengths.Any())
            {
                strengths.Add("Logical thinking");
                strengths.Add("Problem solving ability");
            }

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
                RecommendedSkills = careerPath.CareerPathSkills.Select(cs => cs.Skill?.Name ?? "").Where(n => !string.IsNullOrEmpty(n)).ToList(),
                RoadmapId = roadmap?.Id ?? 0,
                PlacementReadinessScore = placementReadiness?.OverallScore ?? 0,
                CreatedAt = recommendation.GeneratedAt,
                NextStep = "Roadmap"
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
