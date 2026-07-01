using CareerBridge.API.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CareerBridge.API.Data.Configurations
{
    public class RoadmapStepConfiguration : IEntityTypeConfiguration<RoadmapStep>
    {
        public void Configure(EntityTypeBuilder<RoadmapStep> builder)
        {
            builder.HasKey(rs => rs.Id);

            builder.HasMany(rs => rs.UserProgresses)
                .WithOne(up => up.RoadmapStep)
                .HasForeignKey(up => up.RoadmapStepId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}