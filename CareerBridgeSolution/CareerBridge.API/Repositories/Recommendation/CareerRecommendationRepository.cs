using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CareerBridge.API.Data;
using CareerBridge.API.Models;
using Microsoft.EntityFrameworkCore;

namespace CareerBridge.API.Repositories.Recommendation
{
    public class CareerRecommendationRepository : ICareerRecommendationRepository
    {
        private readonly AppDbContext _context;

        public CareerRecommendationRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<UserAssessment?> GetLatestAssessmentAsync(int userId)
        {
            return await _context.UserAssessments
                .Include(a => a.Answers)
                .ThenInclude(ans => ans.Option)
                .ThenInclude(o => o!.Question)
                .Where(a => a.UserId == userId && a.Completed)
                .OrderByDescending(a => a.SubmittedAt)
                .FirstOrDefaultAsync();
        }

        public async Task<CareerRecommendation?> GetLatestRecommendationAsync(int userId)
        {
            return await _context.CareerRecommendations
                .Include(r => r.CareerPath)
                .Where(r => r.UserId == userId)
                .OrderByDescending(r => r.GeneratedAt)
                .FirstOrDefaultAsync();
        }

        public async Task<CareerPath?> GetCareerPathWithSkillsAndStepsAsync(int careerPathId)
        {
            return await _context.CareerPaths
                .Include(c => c.CareerPathSkills)
                    .ThenInclude(cs => cs.Skill)
                .Include(c => c.RoadmapSteps)
                .FirstOrDefaultAsync(c => c.Id == careerPathId);
        }

        public async Task<Models.Roadmap?> GetRoadmapByUserIdAsync(int userId)
        {
            return await _context.Roadmaps
                .FirstOrDefaultAsync(r => r.UserId == userId);
        }

        public async Task<PlacementReadiness?> GetPlacementReadinessAsync(int userId)
        {
            return await _context.PlacementReadinesses
                .FirstOrDefaultAsync(p => p.UserId == userId);
        }

        public async Task SaveRecommendationTransactionAsync(CareerRecommendation recommendation)
        {
            if (recommendation.Id > 0)
            {
                _context.CareerRecommendations.Update(recommendation);
            }
            else
            {
                await _context.CareerRecommendations.AddAsync(recommendation);
            }
            await _context.SaveChangesAsync();
        }
    }
}
