using System.ComponentModel.DataAnnotations;

namespace CareerBridge.API.DTOs
{
    public class ProgressUpdateRequest
    {
        [Required(ErrorMessage = "StepId is required.")]
        public int StepId { get; set; }

        [Required(ErrorMessage = "Status is required.")]
        [RegularExpression("^(In Progress|Completed)$", ErrorMessage = "Status must be either 'In Progress' or 'Completed'.")]
        public string Status { get; set; } = string.Empty;
    }
}
