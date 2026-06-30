using CareerBridge.API.Data;
using CareerBridge.API.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace CareerBridge.API.Services
{
    // PLACEHOLDER: Functional stub implementation of RoadmapService for the CareerBridge project.
    // TODO: Verify if additional validation or progress history logging needs to be introduced by Beta.
    public class RoadmapService : IRoadmapService
    {
        private readonly AppDbContext _context;

        public RoadmapService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<bool> UpdateStepStatusAsync(int userId, int roadmapStepId, bool isCompleted)
        {
            // Verify if user exists
            var userExists = await _context.Users.AnyAsync(u => u.Id == userId);
            if (!userExists)
            {
                return false;
            }

            // Verify if roadmap step exists
            var stepExists = await _context.RoadmapSteps.AnyAsync(r => r.Id == roadmapStepId);
            if (!stepExists)
            {
                return false;
            }

            // Find or create progress record
            var progress = await _context.UserProgresses
                .FirstOrDefaultAsync(up => up.UserId == userId && up.RoadmapStepId == roadmapStepId);

            if (progress == null)
            {
                if (isCompleted)
                {
                    var newProgress = new UserProgress
                    {
                        UserId = userId,
                        User = null!, // Handled by EF Core via foreign key
                        RoadmapStepId = roadmapStepId,
                        RoadmapStep = null!, // Handled by EF Core via foreign key
                        IsCompleted = true,
                        CompletionDate = DateTime.UtcNow
                    };
                    await _context.UserProgresses.AddAsync(newProgress);
                }
            }
            else
            {
                progress.IsCompleted = isCompleted;
                progress.CompletionDate = isCompleted ? DateTime.UtcNow : null;
                _context.UserProgresses.Update(progress);
            }

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task InitializeUserRoadmapAsync(int userId, int careerPathId, int[]? preExistingSkillIds = null)
        {
            var roadmapSteps = await _context.RoadmapSteps
                .Where(r => r.CareerPathId == careerPathId)
                .ToListAsync();

            foreach (var step in roadmapSteps)
            {
                var existingProgress = await _context.UserProgresses
                    .FirstOrDefaultAsync(up => up.UserId == userId && up.RoadmapStepId == step.Id);

                if (existingProgress == null)
                {
                    bool alreadyKnows = preExistingSkillIds != null && preExistingSkillIds.Contains(step.SkillId);

                    var newProgress = new UserProgress
                    {
                        UserId = userId,
                        User = null!, // Handled by EF Core via foreign key
                        RoadmapStepId = step.Id,
                        RoadmapStep = null!, // Handled by EF Core via foreign key
                        IsCompleted = alreadyKnows,
                        CompletionDate = alreadyKnows ? DateTime.UtcNow : null
                    };
                    await _context.UserProgresses.AddAsync(newProgress);
                }
            }

            await _context.SaveChangesAsync();
        }
    }
}
