using CareerBridge.API.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CareerBridge.API.Data.Configurations
{
    public class UserRoadmapProgressConfiguration : IEntityTypeConfiguration<UserRoadmapProgress>
    {
        public void Configure(EntityTypeBuilder<UserRoadmapProgress> builder)
        {
            builder.HasKey(urp => urp.Id);
        }
    }
}