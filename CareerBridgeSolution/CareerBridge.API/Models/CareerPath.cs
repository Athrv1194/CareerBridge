using System.ComponentModel.DataAnnotations;

namespace CareerBridge.API.Models
{
    public class CareerPath
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(200)]
        public string Title { get; set; }

        public string Description { get; set; }

        public ICollection<RoadmapStep> RoadmapSteps { get; set; } = new List<RoadmapStep>();
    }
}
