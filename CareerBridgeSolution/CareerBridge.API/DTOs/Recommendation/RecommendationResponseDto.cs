using System;
using System.Collections.Generic;

namespace CareerBridge.API.DTOs.Recommendation
{
    public class RecommendationResponseDto
    {
        public int CareerId { get; set; }
        public string CareerTitle { get; set; } = string.Empty;
        public string CareerDescription { get; set; } = string.Empty;
        public string IndustryDemand { get; set; } = string.Empty;
        public string AverageSalary { get; set; } = string.Empty;
        public string EstimatedDuration { get; set; } = string.Empty;
        public int MatchPercentage { get; set; }
        public string RecommendationReason { get; set; } = string.Empty;
        public List<string> Strengths { get; set; } = new List<string>();
        public List<string> RecommendedSkills { get; set; } = new List<string>();
        public int RoadmapId { get; set; }
        public int PlacementReadinessScore { get; set; }
        public DateTime CreatedAt { get; set; }
        public string NextStep { get; set; } = string.Empty;
    }
}
