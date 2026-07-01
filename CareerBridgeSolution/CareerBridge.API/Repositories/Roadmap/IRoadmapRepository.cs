using System.Collections.Generic;
using System.Threading.Tasks;
using CareerBridge.API.Models;

namespace CareerBridge.API.Repositories.Roadmap
{
    public interface IRoadmapRepository
    {
        Task<CareerRecommendation?> GetLatestRecommendationAsync(int userId);
        Task<CareerPath?> GetCareerPathWithStepsAsync(int careerPathId);
        Task<UserAssessment?> GetLatestAssessmentAsync(int userId);
        Task<Models.Roadmap?> GetRoadmapByUserIdAsync(int userId);
        Task<List<UserRoadmapProgress>> GetRoadmapProgressAsync(int userId);
        Task SaveRoadmapTransactionAsync(Models.Roadmap roadmap, List<UserRoadmapProgress> progressList, PlacementReadiness readiness);
        Task<bool> UpdateProgressStatusAsync(int userId, int roadmapStepId, Enums.RoadmapStatus status);
        Task<PlacementReadiness?> GetPlacementReadinessAsync(int userId);
        Task SavePlacementReadinessAsync(PlacementReadiness readiness);
    }
}
