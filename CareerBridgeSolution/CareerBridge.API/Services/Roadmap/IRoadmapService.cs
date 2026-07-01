using System.Threading.Tasks;
using CareerBridge.API.DTOs.Roadmap;
using CareerBridge.API.Responses;

namespace CareerBridge.API.Services.Roadmap
{
    public interface IRoadmapService
    {
        Task<ApiResponse<object>> StartRoadmapAsync(int userId);
        Task<ApiResponse<RoadmapResponseDto>> GetRoadmapAsync(int userId);
        Task<ApiResponse<CurrentLearningDto>> GetCurrentLearningAsync(int userId);
        Task<ApiResponse<RoadmapProgressDto>> GetProgressAsync(int userId);
        Task<ApiResponse<object>> UpdateStatusAsync(int userId, StatusUpdateDto dto);
    }
}
