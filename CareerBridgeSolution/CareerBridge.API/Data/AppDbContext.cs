using CareerBridge.API.Models;
using Microsoft.EntityFrameworkCore;

namespace CareerBridge.API.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<StudentProfile> StudentProfiles { get; set; }
        public DbSet<CareerPath> CareerPaths { get; set; }
        public DbSet<Skill> Skills { get; set; }
        public DbSet<CareerPathSkill> CareerPathSkills { get; set; }
        public DbSet<AssessmentQuestion> AssessmentQuestions { get; set; }
        public DbSet<AssessmentOption> AssessmentOptions { get; set; }
        public DbSet<UserAssessment> UserAssessments { get; set; }
        public DbSet<UserAssessmentAnswer> UserAssessmentAnswers { get; set; }
        public DbSet<CareerRecommendation> CareerRecommendations { get; set; }
        public DbSet<Roadmap> Roadmaps { get; set; }
        public DbSet<RoadmapStep> RoadmapSteps { get; set; }
        public DbSet<UserRoadmapProgress> UserRoadmapProgresses { get; set; }
        public DbSet<Project> Projects { get; set; }
        public DbSet<PlacementReadiness> PlacementReadinesses { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            
            // Apply all IEntityTypeConfiguration classes from the assembly
            modelBuilder.ApplyConfigurationsFromAssembly(typeof(AppDbContext).Assembly);
        }
    }
}