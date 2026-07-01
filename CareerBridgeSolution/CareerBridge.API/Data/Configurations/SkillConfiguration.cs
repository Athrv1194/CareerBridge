using CareerBridge.API.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CareerBridge.API.Data.Configurations
{
    public class SkillConfiguration : IEntityTypeConfiguration<Skill>
    {
        public void Configure(EntityTypeBuilder<Skill> builder)
        {
            builder.HasKey(s => s.Id);
            builder.HasIndex(s => s.Name).IsUnique();

            builder.HasMany(s => s.CareerPathSkills)
                .WithOne(cps => cps.Skill)
                .HasForeignKey(cps => cps.SkillId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}