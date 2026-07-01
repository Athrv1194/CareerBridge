using CareerBridge.API.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CareerBridge.API.Data.Configurations
{
    public class CareerPathSkillConfiguration : IEntityTypeConfiguration<CareerPathSkill>
    {
        public void Configure(EntityTypeBuilder<CareerPathSkill> builder)
        {
            builder.HasKey(cps => cps.Id);
            builder.HasIndex(cps => new { cps.CareerPathId, cps.SkillId }).IsUnique();
        }
    }
}