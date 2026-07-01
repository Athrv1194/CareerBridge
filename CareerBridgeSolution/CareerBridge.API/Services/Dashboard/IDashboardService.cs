using System.Collections.Generic;
using System.Threading.Tasks;
using CareerBridge.API.DTOs.Dashboard;
using CareerBridge.API.Responses;

namespace CareerBridge.API.Services.Dashboard
{
    public interface IDashboardService
    {
        Task<ApiResponse<DashboardDto>> GetDashboardAsync(int userId);
        Task<ApiResponse<DashboardSummaryDto>> GetDashboardSummaryAsync(int userId);
        Task<ApiResponse<List<ActivityDto>>> GetRecentActivityAsync(int userId);
    }
}
