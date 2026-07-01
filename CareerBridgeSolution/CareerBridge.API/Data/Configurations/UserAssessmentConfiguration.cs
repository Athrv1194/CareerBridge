using CareerBridge.API.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CareerBridge.API.Data.Configurations
{
    public class UserAssessmentConfiguration : IEntityTypeConfiguration<UserAssessment>
    {
        public void Configure(EntityTypeBuilder<UserAssessment> builder)
        {
            builder.HasKey(ua => ua.Id);

            builder.HasMany(ua => ua.Answers)
                .WithOne(a => a.Assessment)
                .HasForeignKey(a => a.AssessmentId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}