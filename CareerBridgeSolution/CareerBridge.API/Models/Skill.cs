using System.ComponentModel.DataAnnotations;

namespace CareerBridge.API.Models
{
    public class Skill
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(100)]
        public required string Name { get; set; }

        public string? Description { get; set; }

        public ICollection<RoadmapStep> RoadmapSteps { get; set; } = new List<RoadmapStep>();
    }
}
