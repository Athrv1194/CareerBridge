using System.Collections.Generic;
using System.Threading.Tasks;
using CareerBridge.API.Models;

namespace CareerBridge.API.Repositories.Recommendation
{
    public interface ICareerRecommendationRepository
    {
        Task<UserAssessment?> GetLatestAssessmentAsync(int userId);
        Task<CareerRecommendation?> GetLatestRecommendationAsync(int userId);
        Task<CareerPath?> GetCareerPathWithSkillsAndStepsAsync(int careerPathId);
        Task<Models.Roadmap?> GetRoadmapByUserIdAsync(int userId);
        Task<PlacementReadiness?> GetPlacementReadinessAsync(int userId);
        Task SaveRecommendationTransactionAsync(CareerRecommendation recommendation);
    }
}
