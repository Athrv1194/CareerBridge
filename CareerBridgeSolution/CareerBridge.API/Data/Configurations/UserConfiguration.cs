using CareerBridge.API.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CareerBridge.API.Data.Configurations
{
    public class UserConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.HasKey(u => u.Id);
            builder.HasIndex(u => u.Email).IsUnique();
            
            // Cascade deletes
            builder.HasOne(u => u.StudentProfile)
                .WithOne(p => p.User)
                .HasForeignKey<StudentProfile>(p => p.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.HasOne(u => u.CareerRecommendation)
                .WithOne(r => r.User)
                .HasForeignKey<CareerRecommendation>(r => r.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.HasOne(u => u.Roadmap)
                .WithOne(r => r.User)
                .HasForeignKey<Roadmap>(r => r.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.HasOne(u => u.PlacementReadiness)
                .WithOne(pr => pr.User)
                .HasForeignKey<PlacementReadiness>(pr => pr.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.HasMany(u => u.UserAssessments)
                .WithOne(ua => ua.User)
                .HasForeignKey(ua => ua.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.HasMany(u => u.UserRoadmapProgresses)
                .WithOne(urp => urp.User)
                .HasForeignKey(urp => urp.UserId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}