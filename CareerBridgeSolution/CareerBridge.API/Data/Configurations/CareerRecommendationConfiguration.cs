using CareerBridge.API.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CareerBridge.API.Data.Configurations
{
    public class CareerRecommendationConfiguration : IEntityTypeConfiguration<CareerRecommendation>
    {
        public void Configure(EntityTypeBuilder<CareerRecommendation> builder)
        {
            builder.HasKey(cr => cr.Id);
            builder.Property(cr => cr.MatchPercentage).HasColumnType("decimal(5,2)");

            builder.HasOne(cr => cr.CareerPath)
                .WithMany()
                .HasForeignKey(cr => cr.CareerPathId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}