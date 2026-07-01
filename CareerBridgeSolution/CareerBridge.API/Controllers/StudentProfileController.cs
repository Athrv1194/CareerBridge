using System.Security.Claims;
using System.Threading.Tasks;
using CareerBridge.API.DTOs.Profile;
using CareerBridge.API.Services.Profile;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CareerBridge.API.Controllers
{
    [ApiController]
    [Route("api/profile")]
    [Authorize]
    public class StudentProfileController : ControllerBase
    {
        private readonly IStudentProfileService _profileService;

        public StudentProfileController(IStudentProfileService profileService)
        {
            _profileService = profileService;
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
        /// Return logged-in student's profile.
        /// </summary>
        [HttpGet]
        public async Task<IActionResult> GetProfile()
        {
            try
            {
                var userId = GetUserId();
                var result = await _profileService.GetProfileAsync(userId);
                return StatusCode(result.StatusCode, result);
            }
            catch (System.UnauthorizedAccessException)
            {
                return Unauthorized(new { Success = false, Message = "Unauthorized access" });
            }
        }

        /// <summary>
        /// Create Profile.
        /// </summary>
        [HttpPost]
        public async Task<IActionResult> CreateProfile([FromBody] CreateStudentProfileDto request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { Success = false, Message = "Validation Failed", Errors = ModelState.Values });
            }

            try
            {
                var userId = GetUserId();
                var result = await _profileService.CreateProfileAsync(userId, request);
                return StatusCode(result.StatusCode, result);
            }
            catch (System.UnauthorizedAccessException)
            {
                return Unauthorized(new { Success = false, Message = "Unauthorized access" });
            }
        }

        /// <summary>
        /// Update Profile.
        /// </summary>
        [HttpPut]
        public async Task<IActionResult> UpdateProfile([FromBody] UpdateStudentProfileDto request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { Success = false, Message = "Validation Failed", Errors = ModelState.Values });
            }

            try
            {
                var userId = GetUserId();
                var result = await _profileService.UpdateProfileAsync(userId, request);
                return StatusCode(result.StatusCode, result);
            }
            catch (System.UnauthorizedAccessException)
            {
                return Unauthorized(new { Success = false, Message = "Unauthorized access" });
            }
        }

        /// <summary>
        /// Return completion status.
        /// </summary>
        [HttpGet("completion")]
        public async Task<IActionResult> GetCompletionStatus()
        {
            try
            {
                var userId = GetUserId();
                var result = await _profileService.GetCompletionStatusAsync(userId);
                return StatusCode(result.StatusCode, result);
            }
            catch (System.UnauthorizedAccessException)
            {
                return Unauthorized(new { Success = false, Message = "Unauthorized access" });
            }
        }
    }
}
