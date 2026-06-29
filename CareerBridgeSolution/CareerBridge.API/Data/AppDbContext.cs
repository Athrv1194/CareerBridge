using CareerBridge.API.Models;
using Microsoft.EntityFrameworkCore;

namespace CareerBridge.API.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; } = null!;
        public DbSet<CareerPath> CareerPaths { get; set; } = null!;
        public DbSet<Skill> Skills { get; set; } = null!;
        public DbSet<RoadmapStep> RoadmapSteps { get; set; } = null!;
        public DbSet<UserProgress> UserProgresses { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Add unique index for User properties
            modelBuilder.Entity<User>()
                .HasIndex(u => u.Username)
                .IsUnique();

            modelBuilder.Entity<User>()
                .HasIndex(u => u.Email)
                .IsUnique();

            // Add unique index for CareerPath title
            modelBuilder.Entity<CareerPath>()
                .HasIndex(cp => cp.Title)
                .IsUnique();

            // Add unique index for Skill name
            modelBuilder.Entity<Skill>()
                .HasIndex(s => s.Name)
                .IsUnique();
        }
    }
}
