using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CareerBridge.API.Data;
using CareerBridge.API.Models;
using Microsoft.EntityFrameworkCore;

namespace CareerBridge.API.Repositories.Roadmap
{
    public class RoadmapRepository : IRoadmapRepository
    {
        private readonly AppDbContext _context;

        public RoadmapRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<CareerRecommendation?> GetLatestRecommendationAsync(int userId)
        {
            return await _context.CareerRecommendations
                .Include(r => r.CareerPath)
                .Where(r => r.UserId == userId)
                .OrderByDescending(r => r.GeneratedAt)
                .FirstOrDefaultAsync();
        }

        public async Task<CareerPath?> GetCareerPathWithStepsAsync(int careerPathId)
        {
            return await _context.CareerPaths
                .Include(c => c.RoadmapSteps)
                .FirstOrDefaultAsync(c => c.Id == careerPathId);
        }

        public async Task<UserAssessment?> GetLatestAssessmentAsync(int userId)
        {
            return await _context.UserAssessments
                .Include(a => a.Answers)
                    .ThenInclude(ans => ans.Option)
                .Where(a => a.UserId == userId && a.Completed)
                .OrderByDescending(a => a.SubmittedAt)
                .FirstOrDefaultAsync();
        }

        public async Task<Models.Roadmap?> GetRoadmapByUserIdAsync(int userId)
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

        public async Task SaveRoadmapTransactionAsync(Models.Roadmap roadmap, List<UserRoadmapProgress> progressList, PlacementReadiness readiness)
        {
            using var transaction = await _context.Database.BeginTransactionAsync();
            try
            {
                var oldRoadmap = await _context.Roadmaps.FirstOrDefaultAsync(r => r.UserId == roadmap.UserId);
                if (oldRoadmap != null)
                {
                    var oldProgress = await _context.UserRoadmapProgresses.Where(p => p.UserId == roadmap.UserId).ToListAsync();
                    _context.UserRoadmapProgresses.RemoveRange(oldProgress);
                    _context.Roadmaps.Remove(oldRoadmap);
                    await _context.SaveChangesAsync();
                }

                await _context.Roadmaps.AddAsync(roadmap);
                await _context.SaveChangesAsync(); 

                foreach (var p in progressList)
                {
                    p.UserId = roadmap.UserId; 
                }
                await _context.UserRoadmapProgresses.AddRangeAsync(progressList);

                var oldReadiness = await _context.PlacementReadinesses.FirstOrDefaultAsync(p => p.UserId == readiness.UserId);
                if (oldReadiness != null)
                {
                    oldReadiness.RoadmapScore = readiness.RoadmapScore;
                    oldReadiness.OverallScore = readiness.OverallScore;
                    oldReadiness.CalculatedOn = readiness.CalculatedOn;
                    _context.PlacementReadinesses.Update(oldReadiness);
                }
                else
                {
                    await _context.PlacementReadinesses.AddAsync(readiness);
                }

                await _context.SaveChangesAsync();
                await transaction.CommitAsync();
            }
            catch
            {
                await transaction.RollbackAsync();
                throw;
            }
        }

        public async Task<bool> UpdateProgressStatusAsync(int userId, int roadmapStepId, Enums.RoadmapStatus status)
        {
            var progress = await _context.UserRoadmapProgresses
                .FirstOrDefaultAsync(p => p.UserId == userId && p.RoadmapStepId == roadmapStepId);
                
            if (progress == null)
                return false;

            progress.Status = status;
            if (status == Enums.RoadmapStatus.Completed || status == Enums.RoadmapStatus.Verified)
            {
                progress.CompletedDate = System.DateTime.UtcNow;
            }
            else
            {
                progress.CompletedDate = null;
            }

            _context.UserRoadmapProgresses.Update(progress);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<PlacementReadiness?> GetPlacementReadinessAsync(int userId)
        {
            return await _context.PlacementReadinesses.FirstOrDefaultAsync(p => p.UserId == userId);
        }

        public async Task SavePlacementReadinessAsync(PlacementReadiness readiness)
        {
            _context.PlacementReadinesses.Update(readiness);
            await _context.SaveChangesAsync();
        }
    }
}
