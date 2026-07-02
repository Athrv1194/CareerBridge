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
        public List<CategoryScoreDto> CategoryScores { get; set; } = new();
        public List<string> RecommendedSkills { get; set; } = new List<string>();
        public int RoadmapId { get; set; }
        public List<RoadmapStepDto> RoadmapSteps { get; set; } = new();
        public int PlacementReadinessScore { get; set; }
        public DateTime CreatedAt { get; set; }
        public string NextStep { get; set; } = string.Empty;
        public List<AlternativeCareerDto> Alternatives { get; set; } = new();
    }

    public class CategoryScoreDto
    {
        public string Label { get; set; } = string.Empty;
        public int Percentage { get; set; }
    }

    public class RoadmapStepDto
    {
        public int StepNumber { get; set; }
        public string Duration { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
        public string Subtitle { get; set; } = string.Empty;
    }

    public class AlternativeCareerDto
    {
        public int CareerId { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string IndustryDemand { get; set; } = string.Empty;
        public string AverageSalary { get; set; } = string.Empty;
        public string EstimatedDuration { get; set; } = string.Empty;
        public int MatchPercentage { get; set; }
    }
}
