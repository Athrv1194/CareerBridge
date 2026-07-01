using System.Collections.Generic;
using System.Threading.Tasks;
using CareerBridge.API.Models;

namespace CareerBridge.API.Repositories.Dashboard
{
    public interface IDashboardRepository
    {
        Task<StudentProfile?> GetStudentProfileAsync(int userId);
        Task<CareerRecommendation?> GetLatestRecommendationAsync(int userId);
        Task<Models.Roadmap?> GetRoadmapWithProgressAsync(int userId);
        Task<List<UserRoadmapProgress>> GetRoadmapProgressAsync(int userId);
        Task<PlacementReadiness?> GetPlacementReadinessAsync(int userId);
        Task<UserAssessment?> GetLatestAssessmentAsync(int userId);
        Task<List<Project>> GetRecommendedProjectsAsync(int careerPathId);
    }
}
