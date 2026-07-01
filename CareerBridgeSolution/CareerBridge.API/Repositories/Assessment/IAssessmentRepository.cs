using System.Collections.Generic;
using System.Threading.Tasks;
using CareerBridge.API.Models;

namespace CareerBridge.API.Repositories.Assessment
{
    public interface IAssessmentRepository
    {
        Task<List<AssessmentQuestion>> GetQuestionsAsync();
        Task<AssessmentOption?> GetOptionAsync(int optionId);
        Task<UserAssessment?> GetAssessmentByUserIdAsync(int userId);
        Task<UserAssessment> SaveAssessmentAsync(UserAssessment assessment);
        Task<List<CareerPath>> GetCareerPathsAsync();
        Task SaveRecommendationAsync(CareerRecommendation recommendation);
        Task<CareerRecommendation?> GetLatestRecommendationAsync(int userId);
    }
}
