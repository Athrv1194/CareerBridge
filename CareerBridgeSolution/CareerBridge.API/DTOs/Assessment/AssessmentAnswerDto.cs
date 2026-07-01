using System.ComponentModel.DataAnnotations;

namespace CareerBridge.API.DTOs.Assessment
{
    public class AssessmentAnswerDto
    {
        [Required]
        public int QuestionId { get; set; }
        [Required]
        public int OptionId { get; set; }
    }
}
