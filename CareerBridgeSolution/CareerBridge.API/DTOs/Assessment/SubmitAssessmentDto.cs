using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace CareerBridge.API.DTOs.Assessment
{
    public class SubmitAssessmentDto
    {
        [Required]
        public List<AssessmentAnswerDto> Answers { get; set; } = new List<AssessmentAnswerDto>();
    }
}
