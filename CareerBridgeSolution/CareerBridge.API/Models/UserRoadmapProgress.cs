using System;
using CareerBridge.API.Enums;

namespace CareerBridge.API.Models
{
    public class UserRoadmapProgress
    {
        public int Id { get; set; }
        public int RoadmapStepId { get; set; }
        public int UserId { get; set; }
        public RoadmapStatus Status { get; set; } = RoadmapStatus.NotStarted;
        public DateTime? CompletedDate { get; set; }

        public RoadmapStep? RoadmapStep { get; set; }
        public User? User { get; set; }
    }
}