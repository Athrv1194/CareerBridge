using CareerBridge.API.DTOs;
using CareerBridge.API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using System.Threading.Tasks;

namespace CareerBridge.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ProgressController : ControllerBase
    {
        private readonly IRoadmapService _roadmapService;

        public ProgressController(IRoadmapService roadmapService)
        {
            _roadmapService = roadmapService;
        }

        // POST: api/progress/update
        [HttpPost("update")]
        public async Task<IActionResult> UpdateProgress([FromBody] ProgressUpdateRequest request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request payload.");
            }

            // Extract the user ID from JWT token claims
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userIdClaim) || !int.TryParse(userIdClaim, out int userId))
            {
                return Unauthorized(new { message = "Invalid token: user identifier is missing." });
            }

            var result = await _roadmapService.UpdateStepStatusAsync(userId, request.RoadmapStepId, request.IsCompleted);
            if (!result)
            {
                return BadRequest(new { message = "Unable to update progress. Please check that the roadmap step exists." });
            }

            return Ok(new { message = "Progress status updated successfully." });
        }
    }
}
