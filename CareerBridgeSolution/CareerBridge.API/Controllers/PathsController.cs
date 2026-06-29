using CareerBridge.API.Data;
using CareerBridge.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CareerBridge.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PathsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public PathsController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/paths
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CareerPath>>> GetCareerPaths()
        {
            var paths = await _context.CareerPaths.ToListAsync();
            return Ok(paths);
        }

        // GET: api/paths/{id}/roadmap
        [HttpGet("{id}/roadmap")]
        public async Task<ActionResult<IEnumerable<RoadmapStep>>> GetRoadmap(int id)
        {
            var careerPathExists = await _context.CareerPaths.AnyAsync(cp => cp.Id == id);
            if (!careerPathExists)
            {
                return NotFound(new { message = $"Career path with ID {id} not found." });
            }

            var roadmapSteps = await _context.RoadmapSteps
                .Include(r => r.Skill)
                .Where(r => r.CareerPathId == id)
                .OrderBy(r => r.Order)
                .ToListAsync();

            return Ok(roadmapSteps);
        }
    }
}
