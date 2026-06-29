using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CareerBridge.API.Models
{
    public class UserProgress
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int UserId { get; set; }

        [ForeignKey(nameof(UserId))]
        public required User User { get; set; }

        [Required]
        public int RoadmapStepId { get; set; }

        [ForeignKey(nameof(RoadmapStepId))]
        public required RoadmapStep RoadmapStep { get; set; }

        public bool IsCompleted { get; set; }
        
        public DateTime? CompletionDate { get; set; }
    }
}
