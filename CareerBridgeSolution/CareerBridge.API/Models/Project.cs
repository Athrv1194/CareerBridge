using System.ComponentModel.DataAnnotations;
using CareerBridge.API.Enums;

namespace CareerBridge.API.Models
{
    public class Project
    {
        public int Id { get; set; }
        [Required, MaxLength(200)]
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public SkillDifficulty Difficulty { get; set; }
        public int CareerPathId { get; set; }
        public string GitHubTemplate { get; set; } = string.Empty;
        public int EstimatedDuration { get; set; }

        public CareerPath? CareerPath { get; set; }
    }
}