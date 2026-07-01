using System;
using System.ComponentModel.DataAnnotations;

namespace CareerBridge.API.Models
{
    public class StudentProfile
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        
        [MaxLength(200)]
        public string CollegeName { get; set; } = string.Empty;
        [MaxLength(100)]
        public string Degree { get; set; } = string.Empty;
        [MaxLength(100)]
        public string Branch { get; set; } = string.Empty;
        public int AcademicYear { get; set; }
        [Range(0, 10)]
        public decimal CGPA { get; set; }
        [MaxLength(100)]
        public string PreferredLocation { get; set; } = string.Empty;
        [MaxLength(200)]
        public string CareerInterest { get; set; } = string.Empty;
        public string Bio { get; set; } = string.Empty;
        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        public User? User { get; set; }
    }
}