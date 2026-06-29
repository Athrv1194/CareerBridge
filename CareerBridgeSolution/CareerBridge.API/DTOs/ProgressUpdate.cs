using System.ComponentModel.DataAnnotations;

namespace CareerBridge.API.DTOs
{
    public class ProgressUpdateRequest
    {
        [Required]
        public int RoadmapStepId { get; set; }

        [Required]
        public bool IsCompleted { get; set; }
    }
}
