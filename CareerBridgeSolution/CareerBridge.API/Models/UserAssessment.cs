using System;
using System.Collections.Generic;

namespace CareerBridge.API.Models
{
    public class UserAssessment
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public DateTime SubmittedAt { get; set; } = DateTime.UtcNow;
        public bool Completed { get; set; }

        public User? User { get; set; }
        public ICollection<UserAssessmentAnswer> Answers { get; set; } = new List<UserAssessmentAnswer>();
    }
}