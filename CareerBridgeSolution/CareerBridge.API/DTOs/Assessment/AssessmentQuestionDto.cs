using System.Collections.Generic;

namespace CareerBridge.API.DTOs.Assessment
{
    public class AssessmentQuestionDto
    {
        public int QuestionId { get; set; }
        public string Question { get; set; } = string.Empty;
        public string Category { get; set; } = string.Empty;
        public int DisplayOrder { get; set; }
        public List<AssessmentOptionDto> Options { get; set; } = new List<AssessmentOptionDto>();
    }
}
