using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace CareerBridge.API.Models
{
    public class AssessmentQuestion
    {
        public int Id { get; set; }
        [Required]
        public string Question { get; set; } = string.Empty;
        [MaxLength(100)]
        public string Category { get; set; } = string.Empty;
        public int DisplayOrder { get; set; }
        public bool IsActive { get; set; } = true;

        public ICollection<AssessmentOption> AssessmentOptions { get; set; } = new List<AssessmentOption>();
    }
}