using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using CareerBridge.API.Enums;

namespace CareerBridge.API.Models
{
    public class User
    {
        public int Id { get; set; }
        [Required, MaxLength(150)]
        public string FullName { get; set; } = string.Empty;
        [Required, EmailAddress, MaxLength(255)]
        public string Email { get; set; } = string.Empty;
        [Required]
        public string PasswordHash { get; set; } = string.Empty;
        public UserRole Role { get; set; } = UserRole.Student;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
        public bool IsActive { get; set; } = true;

        public StudentProfile? StudentProfile { get; set; }
        public CareerRecommendation? CareerRecommendation { get; set; }
        public Roadmap? Roadmap { get; set; }
        public PlacementReadiness? PlacementReadiness { get; set; }
        public ICollection<UserAssessment> UserAssessments { get; set; } = new List<UserAssessment>();
        public ICollection<UserRoadmapProgress> UserRoadmapProgresses { get; set; } = new List<UserRoadmapProgress>();
    }
}