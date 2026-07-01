using System.ComponentModel.DataAnnotations;

namespace CareerBridge.API.DTOs.Profile
{
    public class UpdateStudentProfileDto
    {
        [Required(ErrorMessage = "CollegeName is required")]
        public string CollegeName { get; set; } = string.Empty;

        [Required(ErrorMessage = "Degree is required")]
        public string Degree { get; set; } = string.Empty;

        [Required(ErrorMessage = "Branch is required")]
        public string Branch { get; set; } = string.Empty;

        [Required(ErrorMessage = "AcademicYear is required")]
        public int? AcademicYear { get; set; }

        [Range(0, 10, ErrorMessage = "CGPA must be between 0 and 10")]
        public decimal? CGPA { get; set; }

        [Required(ErrorMessage = "PreferredLocation is required")]
        public string PreferredLocation { get; set; } = string.Empty;

        [Required(ErrorMessage = "CareerInterest is required")]
        public string CareerInterest { get; set; } = string.Empty;

        [MaxLength(500, ErrorMessage = "Bio cannot exceed 500 characters")]
        public string Bio { get; set; } = string.Empty;
    }
}
