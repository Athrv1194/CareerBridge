using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CareerBridge.API.Data;
using CareerBridge.API.Models;
using Microsoft.EntityFrameworkCore;

namespace CareerBridge.API.Repositories.Assessment
{
    public class AssessmentRepository : IAssessmentRepository
    {
        private readonly AppDbContext _context;

        public AssessmentRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<AssessmentQuestion>> GetQuestionsAsync()
        {
            return await _context.AssessmentQuestions
                .Include(q => q.AssessmentOptions)
                .Where(q => q.IsActive)
                .OrderBy(q => q.DisplayOrder)
                .ToListAsync();
        }

        public async Task<AssessmentOption?> GetOptionAsync(int optionId)
        {
            return await _context.AssessmentOptions
                .FirstOrDefaultAsync(o => o.Id == optionId);
        }

        public async Task<UserAssessment?> GetAssessmentByUserIdAsync(int userId)
        {
            return await _context.UserAssessments
                .Include(ua => ua.Answers)
                .FirstOrDefaultAsync(ua => ua.UserId == userId);
        }

        public async Task<UserAssessment> SaveAssessmentAsync(UserAssessment assessment)
        {
            var existing = await GetAssessmentByUserIdAsync(assessment.UserId);
            if (existing != null)
            {
                // Remove old answers and update
                _context.UserAssessmentAnswers.RemoveRange(existing.Answers);
                existing.Answers.Clear();
                foreach(var ans in assessment.Answers)
                {
                    existing.Answers.Add(ans);
                }
                existing.SubmittedAt = assessment.SubmittedAt;
                existing.Completed = assessment.Completed;
                _context.UserAssessments.Update(existing);
                await _context.SaveChangesAsync();
                return existing;
            }

            await _context.UserAssessments.AddAsync(assessment);
            await _context.SaveChangesAsync();
            return assessment;
        }

        public async Task<List<CareerPath>> GetCareerPathsAsync()
        {
            return await _context.CareerPaths.ToListAsync();
        }

        public async Task SaveRecommendationAsync(CareerRecommendation recommendation)
        {
            var existing = await GetLatestRecommendationAsync(recommendation.UserId);
            if (existing != null)
            {
                existing.CareerPathId = recommendation.CareerPathId;
                existing.MatchPercentage = recommendation.MatchPercentage;
                existing.RecommendationReason = recommendation.RecommendationReason;
                existing.GeneratedAt = recommendation.GeneratedAt;
                _context.CareerRecommendations.Update(existing);
            }
            else
            {
                await _context.CareerRecommendations.AddAsync(recommendation);
            }
            await _context.SaveChangesAsync();
        }

        public async Task<CareerRecommendation?> GetLatestRecommendationAsync(int userId)
        {
            return await _context.CareerRecommendations
                .Include(r => r.CareerPath)
                .Where(r => r.UserId == userId)
                .OrderByDescending(r => r.GeneratedAt)
                .FirstOrDefaultAsync();
        }
    }
}
