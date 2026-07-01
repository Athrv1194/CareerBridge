using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using CareerBridge.API.Enums;

namespace CareerBridge.API.Models
{
    public class Skill
    {
        public int Id { get; set; }
        [Required, MaxLength(100)]
        public string Name { get; set; } = string.Empty;
        [MaxLength(100)]
        public string Category { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public SkillDifficulty Difficulty { get; set; }
        public int EstimatedLearningHours { get; set; }

        public ICollection<CareerPathSkill> CareerPathSkills { get; set; } = new List<CareerPathSkill>();
    }
}