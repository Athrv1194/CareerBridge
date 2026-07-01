using CareerBridge.API.DTOs.Auth;
using CareerBridge.API.DTOs.User;
using CareerBridge.API.Enums;
using CareerBridge.API.Helpers;
using CareerBridge.API.Models;
using CareerBridge.API.Repositories.Auth;
using CareerBridge.API.Responses;

namespace CareerBridge.API.Services.Auth
{
    public class AuthService : IAuthService
    {
        private readonly IAuthRepository _authRepository;
        private readonly IJwtService _jwtService;

        public AuthService(IAuthRepository authRepository, IJwtService jwtService)
        {
            _authRepository = authRepository;
            _jwtService = jwtService;
        }

        public async Task<ApiResponse<object>> RegisterAsync(RegisterRequestDto request)
        {
            // Check duplicate email
            var emailExists = await _authRepository.EmailExistsAsync(request.Email);
            if (emailExists)
            {
                return new ApiResponse<object>
                {
                    Success = false,
                    Message = "Email already exists.",
                    StatusCode = 409
                };
            }

            // Create new user
            var user = new User
            {
                FullName = request.FullName,
                Email = request.Email,
                PasswordHash = PasswordHelper.HashPassword(request.Password),
                Role = UserRole.Student,
                IsActive = true,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            var createdUser = await _authRepository.CreateUserAsync(user);

            var userDto = new UserDto
            {
                Id = createdUser.Id,
                FullName = createdUser.FullName,
                Email = createdUser.Email,
                Role = createdUser.Role.ToString()
            };

            return new ApiResponse<object>
            {
                Success = true,
                Message = "User Registered Successfully",
                StatusCode = 201,
                Data = userDto
            };
        }

        public async Task<ApiResponse<LoginResponseDto>> LoginAsync(LoginRequestDto request)
        {
            // Find user by email
            var user = await _authRepository.GetUserByEmailAsync(request.Email);
            if (user == null)
            {
                return new ApiResponse<LoginResponseDto>
                {
                    Success = false,
                    Message = "Invalid Email or Password",
                    StatusCode = 401
                };
            }

            // Check if account is active
            if (!user.IsActive)
            {
                return new ApiResponse<LoginResponseDto>
                {
                    Success = false,
                    Message = "Account is deactivated. Please contact support.",
                    StatusCode = 403
                };
            }

            // Verify password
            if (!PasswordHelper.VerifyPassword(request.Password, user.PasswordHash))
            {
                return new ApiResponse<LoginResponseDto>
                {
                    Success = false,
                    Message = "Invalid Email or Password",
                    StatusCode = 401
                };
            }

            // Generate JWT token
            var token = _jwtService.GenerateToken(user.Id, user.Email, user.Role.ToString());
            var expiry = _jwtService.GetExpiry();

            var loginResponse = new LoginResponseDto
            {
                Token = token,
                Expires = expiry,
                User = new UserDto
                {
                    Id = user.Id,
                    FullName = user.FullName,
                    Email = user.Email,
                    Role = user.Role.ToString()
                }
            };

            return new ApiResponse<LoginResponseDto>
            {
                Success = true,
                Message = "Login Successful",
                StatusCode = 200,
                Data = loginResponse
            };
        }
    }
}
