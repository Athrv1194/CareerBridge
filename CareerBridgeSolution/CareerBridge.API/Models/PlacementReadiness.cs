using System;

namespace CareerBridge.API.Models
{
    public class PlacementReadiness
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int RoadmapScore { get; set; }
        public int SkillScore { get; set; }
        public int ProjectScore { get; set; }
        public int AssessmentScore { get; set; }
        public int OverallScore { get; set; }
        public DateTime CalculatedOn { get; set; } = DateTime.UtcNow;

        public User? User { get; set; }
    }
}