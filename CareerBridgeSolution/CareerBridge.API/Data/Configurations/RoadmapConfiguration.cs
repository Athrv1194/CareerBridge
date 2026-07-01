using CareerBridge.API.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CareerBridge.API.Data.Configurations
{
    public class RoadmapConfiguration : IEntityTypeConfiguration<Roadmap>
    {
        public void Configure(EntityTypeBuilder<Roadmap> builder)
        {
            builder.HasKey(r => r.Id);

            builder.HasOne(r => r.CareerPath)
                .WithMany()
                .HasForeignKey(r => r.CareerPathId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}