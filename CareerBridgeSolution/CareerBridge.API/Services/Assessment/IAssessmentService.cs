using System.Collections.Generic;
using System.Threading.Tasks;
using CareerBridge.API.DTOs.Assessment;
using CareerBridge.API.Responses;

namespace CareerBridge.API.Services.Assessment
{
    public interface IAssessmentService
    {
        Task<ApiResponse<List<AssessmentQuestionDto>>> GetQuestionsAsync();
        Task<ApiResponse<object>> SubmitAssessmentAsync(int userId, SubmitAssessmentDto request);
        Task<ApiResponse<AssessmentResultDto>> GetResultAsync(int userId);
    }
}
