using CareerBridge.API.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CareerBridge.API.Data.Configurations
{
    public class AssessmentOptionConfiguration : IEntityTypeConfiguration<AssessmentOption>
    {
        public void Configure(EntityTypeBuilder<AssessmentOption> builder)
        {
            builder.HasKey(o => o.Id);
            
            builder.HasOne(o => o.CareerPath)
                .WithMany()
                .HasForeignKey(o => o.CareerPathId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}