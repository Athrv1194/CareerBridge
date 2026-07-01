using System.Threading.Tasks;
using CareerBridge.API.DTOs.Recommendation;
using CareerBridge.API.Responses;

namespace CareerBridge.API.Services.Recommendation
{
    public interface ICareerRecommendationService
    {
        Task<ApiResponse<RecommendationResponseDto>> GetRecommendationAsync(int userId);
        Task<ApiResponse<object>> GenerateRecommendationAsync(int userId);
    }
}
