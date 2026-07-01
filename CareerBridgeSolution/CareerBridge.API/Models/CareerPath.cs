using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace CareerBridge.API.Models
{
    public class CareerPath
    {
        public int Id { get; set; }
        [Required, MaxLength(150)]
        public string Title { get; set; } = string.Empty;
        [Required]
        public string Description { get; set; } = string.Empty;
        public decimal AverageSalary { get; set; }
        [MaxLength(100)]
        public string IndustryDemand { get; set; } = string.Empty;
        [MaxLength(100)]
        public string CareerLevel { get; set; } = string.Empty;
        public int DurationMonths { get; set; }
        public string ImageUrl { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public ICollection<CareerPathSkill> CareerPathSkills { get; set; } = new List<CareerPathSkill>();
        public ICollection<RoadmapStep> RoadmapSteps { get; set; } = new List<RoadmapStep>();
        public ICollection<Project> Projects { get; set; } = new List<Project>();
    }
}