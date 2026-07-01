using System.Threading.Tasks;
using CareerBridge.API.DTOs.Profile;
using CareerBridge.API.Responses;

namespace CareerBridge.API.Services.Profile
{
    public interface IStudentProfileService
    {
        Task<ApiResponse<StudentProfileResponseDto>> GetProfileAsync(int userId);
        Task<ApiResponse<StudentProfileResponseDto>> CreateProfileAsync(int userId, CreateStudentProfileDto request);
        Task<ApiResponse<StudentProfileResponseDto>> UpdateProfileAsync(int userId, UpdateStudentProfileDto request);
        Task<ApiResponse<object>> GetCompletionStatusAsync(int userId);
    }
}
