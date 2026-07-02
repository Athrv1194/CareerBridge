using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace CareerBridge.API.Models
{
    public class RoadmapStep
    {
        public int Id { get; set; }
        public int CareerPathId { get; set; }
        [Required, MaxLength(200)]
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public int LearningOrder { get; set; }
        public int EstimatedHours { get; set; }
        public string TopicsJson { get; set; } = "[]";

        public CareerPath? CareerPath { get; set; }
        public ICollection<UserRoadmapProgress> UserProgresses { get; set; } = new List<UserRoadmapProgress>();
    }
}