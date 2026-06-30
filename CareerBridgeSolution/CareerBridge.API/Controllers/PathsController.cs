using CareerBridge.API.Data;
using CareerBridge.API.Models;
using CareerBridge.API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace CareerBridge.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PathsController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IRoadmapService _roadmapService;

        public PathsController(AppDbContext context, IRoadmapService roadmapService)
        {
            _context = context;
            _roadmapService = roadmapService;
        }

        // GET: api/paths
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CareerPath>>> GetCareerPaths()
        {
            var paths = await _context.CareerPaths.ToListAsync();
            return Ok(paths);
        }

        // GET: api/paths/{id}/roadmap
        [Authorize]
        [HttpGet("{id}/roadmap")]
        public async Task<IActionResult> GetRoadmap(int id)
        {
            var careerPathExists = await _context.CareerPaths.AnyAsync(cp => cp.Id == id);
            if (!careerPathExists)
            {
                return NotFound(new { message = $"Career path with ID {id} not found." });
            }

            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userIdClaim) || !int.TryParse(userIdClaim, out int userId))
            {
                return Unauthorized(new { message = "Invalid token: user identifier is missing." });
            }

            // Trigger initialization - this handles creating blank progress if it's the first time
            await _roadmapService.InitializeUserRoadmapAsync(userId, id, null);

            var roadmapSteps = await _context.RoadmapSteps
                .Include(r => r.Skill)
                .Where(r => r.CareerPathId == id)
                .OrderBy(r => r.Order)
                .ToListAsync();

            var userProgress = await _context.UserProgresses
                .Where(up => up.UserId == userId && roadmapSteps.Select(rs => rs.Id).Contains(up.RoadmapStepId))
                .ToListAsync();

            var response = roadmapSteps.Select(step =>
            {
                var progress = userProgress.FirstOrDefault(up => up.RoadmapStepId == step.Id);
                return new 
                { 
                    Id = step.Id, 
                    Title = step.Skill.Name, 
                    Status = progress != null && progress.IsCompleted ? "Completed" : "Not Started" 
                };
            });

            return Ok(response);
        }
    }
}
