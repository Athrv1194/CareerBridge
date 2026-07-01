using CareerBridge.API.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CareerBridge.API.Data.Configurations
{
    public class CareerPathConfiguration : IEntityTypeConfiguration<CareerPath>
    {
        public void Configure(EntityTypeBuilder<CareerPath> builder)
        {
            builder.HasKey(c => c.Id);
            builder.Property(c => c.AverageSalary).HasPrecision(18, 2);
            builder.HasIndex(c => c.Title).IsUnique();

            builder.HasMany(c => c.CareerPathSkills)
                .WithOne(cps => cps.CareerPath)
                .HasForeignKey(cps => cps.CareerPathId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.HasMany(c => c.RoadmapSteps)
                .WithOne(rs => rs.CareerPath)
                .HasForeignKey(rs => rs.CareerPathId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.HasMany(c => c.Projects)
                .WithOne(p => p.CareerPath)
                .HasForeignKey(p => p.CareerPathId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}