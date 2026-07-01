using CareerBridge.API.DTOs.Auth;
using CareerBridge.API.Responses;

namespace CareerBridge.API.Services.Auth
{
    public interface IAuthService
    {
        Task<ApiResponse<object>> RegisterAsync(RegisterRequestDto request);
        Task<ApiResponse<LoginResponseDto>> LoginAsync(LoginRequestDto request);
    }
}
