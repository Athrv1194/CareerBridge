using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CareerBridge.API.Models
{
    public class RoadmapStep
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int CareerPathId { get; set; }

        [ForeignKey(nameof(CareerPathId))]
        public required CareerPath CareerPath { get; set; }

        [Required]
        public int SkillId { get; set; }

        [ForeignKey(nameof(SkillId))]
        public required Skill Skill { get; set; }

        public int Order { get; set; }
    }
}
