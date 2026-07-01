using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CareerBridge.API.Data;
using CareerBridge.API.Models;
using Microsoft.EntityFrameworkCore;

namespace CareerBridge.API.Repositories.Dashboard
{
    public class DashboardRepository : IDashboardRepository
    {
        private readonly AppDbContext _context;

        public DashboardRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<StudentProfile?> GetStudentProfileAsync(int userId)
        {
            return await _context.StudentProfiles
                .Include(p => p.User)
                .FirstOrDefaultAsync(p => p.UserId == userId);
        }

        public async Task<CareerRecommendation?> GetLatestRecommendationAsync(int userId)
        {
            return await _context.CareerRecommendations
                .Include(r => r.CareerPath)
                .Where(r => r.UserId == userId)
                .OrderByDescending(r => r.GeneratedAt)
                .FirstOrDefaultAsync();
        }

        public async Task<Models.Roadmap?> GetRoadmapWithProgressAsync(int userId)
        {
            return await _context.Roadmaps
                .Include(r => r.CareerPath)
                .FirstOrDefaultAsync(r => r.UserId == userId);
        }

        public async Task<List<UserRoadmapProgress>> GetRoadmapProgressAsync(int userId)
        {
            return await _context.UserRoadmapProgresses
                .Include(p => p.RoadmapStep)
                .Where(p => p.UserId == userId)
                .OrderBy(p => p.RoadmapStep!.LearningOrder)
                .ToListAsync();
        }

        public async Task<PlacementReadiness?> GetPlacementReadinessAsync(int userId)
        {
            return await _context.PlacementReadinesses.FirstOrDefaultAsync(p => p.UserId == userId);
        }

        public async Task<UserAssessment?> GetLatestAssessmentAsync(int userId)
        {
            return await _context.UserAssessments
                .Where(a => a.UserId == userId && a.Completed)
                .OrderByDescending(a => a.SubmittedAt)
                .FirstOrDefaultAsync();
        }

        public async Task<List<Project>> GetRecommendedProjectsAsync(int careerPathId)
        {
            return await _context.Projects
                .Where(p => p.CareerPathId == careerPathId)
                .Take(5)
                .ToListAsync();
        }
    }
}
