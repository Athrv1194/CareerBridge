namespace CareerBridge.API.Models
{
    public class UserAssessmentAnswer
    {
        public int Id { get; set; }
        public int AssessmentId { get; set; }
        public int QuestionId { get; set; }
        public int OptionId { get; set; }

        public UserAssessment? Assessment { get; set; }
        public AssessmentQuestion? Question { get; set; }
        public AssessmentOption? Option { get; set; }
    }
}