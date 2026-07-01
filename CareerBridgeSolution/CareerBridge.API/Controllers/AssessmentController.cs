using System.Security.Claims;
using System.Threading.Tasks;
using CareerBridge.API.DTOs.Assessment;
using CareerBridge.API.Services.Assessment;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CareerBridge.API.Controllers
{
    [ApiController]
    [Route("api/assessment")]
    [Authorize]
    public class AssessmentController : ControllerBase
    {
        private readonly IAssessmentService _assessmentService;

        public AssessmentController(IAssessmentService assessmentService)
        {
            _assessmentService = assessmentService;
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
        /// Return all assessment questions with options.
        /// </summary>
        [HttpGet("questions")]
        public async Task<IActionResult> GetQuestions()
        {
            try
            {
                var result = await _assessmentService.GetQuestionsAsync();
                return StatusCode(result.StatusCode, result);
            }
            catch
            {
                return StatusCode(500, new { Success = false, Message = "An error occurred while loading questions." });
            }
        }

        /// <summary>
        /// Receive student answers, Validate, Calculate scores, Save answers.
        /// </summary>
        [HttpPost("submit")]
        public async Task<IActionResult> SubmitAssessment([FromBody] SubmitAssessmentDto request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { Success = false, Message = "Validation Failed", Errors = ModelState.Values });
            }

            try
            {
                var userId = GetUserId();
                var result = await _assessmentService.SubmitAssessmentAsync(userId, request);
                return StatusCode(result.StatusCode, result);
            }
            catch (System.UnauthorizedAccessException)
            {
                return Unauthorized(new { Success = false, Message = "Unauthorized access" });
            }
        }

        /// <summary>
        /// Return student assessment history and recommended career id.
        /// </summary>
        [HttpGet("result")]
        public async Task<IActionResult> GetResult()
        {
            try
            {
                var userId = GetUserId();
                var result = await _assessmentService.GetResultAsync(userId);
                return StatusCode(result.StatusCode, result);
            }
            catch (System.UnauthorizedAccessException)
            {
                return Unauthorized(new { Success = false, Message = "Unauthorized access" });
            }
        }
    }
}
