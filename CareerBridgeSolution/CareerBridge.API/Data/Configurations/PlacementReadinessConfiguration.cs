using CareerBridge.API.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CareerBridge.API.Data.Configurations
{
    public class PlacementReadinessConfiguration : IEntityTypeConfiguration<PlacementReadiness>
    {
        public void Configure(EntityTypeBuilder<PlacementReadiness> builder)
        {
            builder.HasKey(pr => pr.Id);
        }
    }
}