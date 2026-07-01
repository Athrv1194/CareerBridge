using System;

namespace CareerBridge.API.DTOs.Assessment
{
    public class AssessmentResultDto
    {
        public int AssessmentId { get; set; }
        public bool Completed { get; set; }
        public DateTime SubmittedAt { get; set; }
        public int RecommendedCareerId { get; set; }
        public string RecommendedCareerName { get; set; } = string.Empty;
        public int MatchPercentage { get; set; }
    }
}
