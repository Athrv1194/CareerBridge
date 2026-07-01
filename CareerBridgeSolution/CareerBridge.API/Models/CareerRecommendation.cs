using System;

namespace CareerBridge.API.Models
{
    public class CareerRecommendation
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int CareerPathId { get; set; }
        public decimal MatchPercentage { get; set; }
        public string RecommendationReason { get; set; } = string.Empty;
        public DateTime GeneratedAt { get; set; } = DateTime.UtcNow;

        public User? User { get; set; }
        public CareerPath? CareerPath { get; set; }
    }
}