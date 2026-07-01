using System.ComponentModel.DataAnnotations;

namespace CareerBridge.API.Models
{
    public class AssessmentOption
    {
        public int Id { get; set; }
        public int QuestionId { get; set; }
        [Required]
        public string OptionText { get; set; } = string.Empty;
        public int? CareerPathId { get; set; }
        public int Weight { get; set; }

        public AssessmentQuestion? Question { get; set; }
        public CareerPath? CareerPath { get; set; }
    }
}