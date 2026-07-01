using System.Security.Claims;
using System.Threading.Tasks;
using CareerBridge.API.Services.Dashboard;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CareerBridge.API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class DashboardController : ControllerBase
    {
        private readonly IDashboardService _dashboardService;

        public DashboardController(IDashboardService dashboardService)
        {
            _dashboardService = dashboardService;
        }

        private int GetUserId()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userIdClaim) || !int.TryParse(userIdClaim, out int userId))
            {
                throw new System.UnauthorizedAccessException("User ID not found in token.");
            }
            return userId;
        }

        /// <summary>
        /// Retrieves the comprehensive dashboard data for the current user.
        /// </summary>
        [HttpGet]
        public async Task<IActionResult> GetDashboard()
        {
            var response = await _dashboardService.GetDashboardAsync(GetUserId());
            if (!response.Success)
            {
                return StatusCode(response.StatusCode, response);
            }
            return Ok(response);
        }

        /// <summary>
        /// Retrieves a lightweight dashboard summary.
        /// </summary>
        [HttpGet("summary")]
        public async Task<IActionResult> GetDashboardSummary()
        {
            var response = await _dashboardService.GetDashboardSummaryAsync(GetUserId());
            if (!response.Success)
            {
                return StatusCode(response.StatusCode, response);
            }
            return Ok(response);
        }

        /// <summary>
        /// Retrieves the recent activity timeline for the user.
        /// </summary>
        [HttpGet("activity")]
        public async Task<IActionResult> GetActivity()
        {
            var response = await _dashboardService.GetRecentActivityAsync(GetUserId());
            if (!response.Success)
            {
                return StatusCode(response.StatusCode, response);
            }
            return Ok(response);
        }
    }
}
