using System;

namespace CareerBridge.API.Models
{
    public class Roadmap
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int CareerPathId { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime LastUpdated { get; set; } = DateTime.UtcNow;

        public User? User { get; set; }
        public CareerPath? CareerPath { get; set; }
    }
}