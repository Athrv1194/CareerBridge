using System.Security.Claims;
using System.Threading.Tasks;
using CareerBridge.API.Services.Recommendation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CareerBridge.API.Controllers
{
    [ApiController]
    [Route("api/recommendation")]
    [Authorize]
    public class CareerRecommendationController : ControllerBase
    {
        private readonly ICareerRecommendationService _recommendationService;

        public CareerRecommendationController(ICareerRecommendationService recommendationService)
        {
            _recommendationService = recommendationService;
        }

        private int GetUserId()
        {
            var userIdString = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userIdString))
            {
                userIdString = User.FindFirstValue(System.IdentityModel.Tokens.Jwt.JwtRegisteredClaimNames.Sub);
            }
            
            if (int.TryParse(userIdString, out int userId))
            {
                return userId;
            }
            throw new System.UnauthorizedAccessException("User ID not found in token.");
        }

        /// <summary>
        /// Return latest recommendation for logged-in student.
        /// </summary>
        [HttpGet]
        public async Task<IActionResult> GetRecommendation()
        {
            try
            {
                var userId = GetUserId();
                var result = await _recommendationService.GetRecommendationAsync(userId);
                return StatusCode(result.StatusCode, result);
            }
            catch (System.UnauthorizedAccessException)
            {
                return Unauthorized(new { Success = false, Message = "Unauthorized access" });
            }
            catch
            {
                return StatusCode(500, new { Success = false, Message = "An error occurred while loading recommendation." });
            }
        }

        /// <summary>
        /// Internal endpoint to generate recommendation and initialize roadmap.
        /// </summary>
        [HttpPost("generate")]
        public async Task<IActionResult> GenerateRecommendation()
        {
            try
            {
                var userId = GetUserId();
                var result = await _recommendationService.GenerateRecommendationAsync(userId);
                return StatusCode(result.StatusCode, result);
            }
            catch (System.UnauthorizedAccessException)
            {
                return Unauthorized(new { Success = false, Message = "Unauthorized access" });
            }
            catch
            {
                return StatusCode(500, new { Success = false, Message = "An error occurred while generating recommendation." });
            }
        }

        /// <summary>
        /// Return previous recommendations (currently returns latest for mini project).
        /// </summary>
        [HttpGet("history")]
        public async Task<IActionResult> GetRecommendationHistory()
        {
            try
            {
                var userId = GetUserId();
                // For mini-project, history just returns the latest in a list
                var result = await _recommendationService.GetRecommendationAsync(userId);
                
                if (!result.Success)
                {
                    return StatusCode(result.StatusCode, result);
                }

                return Ok(new { Success = true, Message = "Recommendation history loaded.", Data = new[] { result.Data } });
            }
            catch (System.UnauthorizedAccessException)
            {
                return Unauthorized(new { Success = false, Message = "Unauthorized access" });
            }
        }
    }
}
