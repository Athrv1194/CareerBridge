using System;

namespace CareerBridge.API.DTOs.Profile
{
    public class StudentProfileResponseDto
    {
        public int ProfileId { get; set; }
        public int UserId { get; set; }
        public string CollegeName { get; set; } = string.Empty;
        public string Degree { get; set; } = string.Empty;
        public string Branch { get; set; } = string.Empty;
        public int? AcademicYear { get; set; }
        public decimal? CGPA { get; set; }
        public string PreferredLocation { get; set; } = string.Empty;
        public string CareerInterest { get; set; } = string.Empty;
        public string Bio { get; set; } = string.Empty;
        
        public int ProfileCompletionPercentage { get; set; }
        
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}
