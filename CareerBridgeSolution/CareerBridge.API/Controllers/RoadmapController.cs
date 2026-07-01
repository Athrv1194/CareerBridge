using System.Security.Claims;
using System.Threading.Tasks;
using CareerBridge.API.DTOs.Roadmap;
using CareerBridge.API.Services.Roadmap;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CareerBridge.API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class RoadmapController : ControllerBase
    {
        private readonly IRoadmapService _roadmapService;

        public RoadmapController(IRoadmapService roadmapService)
        {
            _roadmapService = roadmapService;
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
        /// Retrieves the personalized roadmap for the current user.
        /// </summary>
        [HttpGet]
        public async Task<IActionResult> GetRoadmap()
        {
            var response = await _roadmapService.GetRoadmapAsync(GetUserId());
            if (!response.Success)
            {
                return StatusCode(response.StatusCode, response);
            }
            return Ok(response);
        }

        /// <summary>
        /// Retrieves the current learning skill for the user's dashboard.
        /// </summary>
        [HttpGet("current")]
        public async Task<IActionResult> GetCurrentLearning()
        {
            var response = await _roadmapService.GetCurrentLearningAsync(GetUserId());
            if (!response.Success)
            {
                return StatusCode(response.StatusCode, response);
            }
            return Ok(response);
        }

        /// <summary>
        /// Initializes the personalized roadmap based on recommendation and existing skills.
        /// </summary>
        [HttpPost("start")]
        public async Task<IActionResult> StartRoadmap()
        {
            var response = await _roadmapService.StartRoadmapAsync(GetUserId());
            if (!response.Success)
            {
                return StatusCode(response.StatusCode, response);
            }
            return Ok(response);
        }

        /// <summary>
        /// Updates the status of a specific roadmap step.
        /// </summary>
        [HttpPut("status")]
        public async Task<IActionResult> UpdateStatus([FromBody] StatusUpdateDto dto)
        {
            if (dto == null || string.IsNullOrWhiteSpace(dto.Status) || dto.RoadmapStepId <= 0)
            {
                return BadRequest(new { Success = false, Message = "Invalid payload" });
            }

            var response = await _roadmapService.UpdateStatusAsync(GetUserId(), dto);
            if (!response.Success)
            {
                return StatusCode(response.StatusCode, response);
            }
            return Ok(response);
        }

        /// <summary>
        /// Retrieves the progress summary for the roadmap.
        /// </summary>
        [HttpGet("progress")]
        public async Task<IActionResult> GetProgress()
        {
            var response = await _roadmapService.GetProgressAsync(GetUserId());
            if (!response.Success)
            {
                return StatusCode(response.StatusCode, response);
            }
            return Ok(response);
        }
    }
}
