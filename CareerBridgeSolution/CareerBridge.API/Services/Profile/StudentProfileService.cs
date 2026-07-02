using System;
using System.Threading.Tasks;
using CareerBridge.API.DTOs.Profile;
using CareerBridge.API.Models;
using CareerBridge.API.Repositories.Profile;
using CareerBridge.API.Responses;

namespace CareerBridge.API.Services.Profile
{
    public class StudentProfileService : IStudentProfileService
    {
        private readonly IStudentProfileRepository _repository;

        public StudentProfileService(IStudentProfileRepository repository)
        {
            _repository = repository;
        }

        public async Task<ApiResponse<StudentProfileResponseDto>> GetProfileAsync(int userId)
        {
            var profile = await _repository.GetByUserIdAsync(userId);
            if (profile == null)
            {
                return new ApiResponse<StudentProfileResponseDto>
                {
                    Success = false,
                    Message = "Student Profile not found",
                    StatusCode = 404
                };
            }

            return new ApiResponse<StudentProfileResponseDto>
            {
                Success = true,
                Message = "Student Profile Loaded Successfully",
                StatusCode = 200,
                Data = MapToResponseDto(profile)
            };
        }

        public async Task<ApiResponse<StudentProfileResponseDto>> CreateProfileAsync(int userId, CreateStudentProfileDto request)
        {
            var exists = await _repository.ExistsByUserIdAsync(userId);
            if (exists)
            {
                return new ApiResponse<StudentProfileResponseDto>
                {
                    Success = false,
                    Message = "Profile already exists for this user",
                    StatusCode = 409
                };
            }

            var profile = new StudentProfile
            {
                UserId = userId,
                CollegeName = request.CollegeName,
                Degree = request.Degree,
                Branch = request.Branch,
                AcademicYear = request.AcademicYear ?? 0,
                CGPA = request.CGPA ?? 0,
                PreferredLocation = request.PreferredLocation,
                CareerInterest = request.CareerInterest,
                Bio = request.Bio,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            await _repository.CreateAsync(profile);

            return new ApiResponse<StudentProfileResponseDto>
            {
                Success = true,
                Message = "Student Profile Created Successfully",
                StatusCode = 201,
                Data = MapToResponseDto(profile)
            };
        }

        public async Task<ApiResponse<StudentProfileResponseDto>> UpdateProfileAsync(int userId, UpdateStudentProfileDto request)
        {
            var profile = await _repository.GetByUserIdAsync(userId);
            if (profile == null)
            {
                // Upsert: Create it if it doesn't exist
                profile = new StudentProfile
                {
                    UserId = userId,
                    CreatedAt = DateTime.UtcNow
                };
                await _repository.CreateAsync(profile);
            }

            profile.CollegeName = request.CollegeName;
            profile.Degree = request.Degree;
            profile.Branch = request.Branch;
            profile.AcademicYear = request.AcademicYear ?? 0;
            profile.CGPA = request.CGPA ?? 0;
            profile.PreferredLocation = request.PreferredLocation;
            profile.CareerInterest = request.CareerInterest;
            profile.Bio = request.Bio;
            profile.UpdatedAt = DateTime.UtcNow;

            await _repository.UpdateAsync(profile);

            return new ApiResponse<StudentProfileResponseDto>
            {
                Success = true,
                Message = "Profile Updated Successfully",
                StatusCode = 200,
                Data = MapToResponseDto(profile)
            };
        }

        public async Task<ApiResponse<object>> GetCompletionStatusAsync(int userId)
        {
            var profile = await _repository.GetByUserIdAsync(userId);
            if (profile == null)
            {
                return new ApiResponse<object>
                {
                    Success = false,
                    Message = "Student Profile not found",
                    StatusCode = 404
                };
            }

            int completionPercentage = CalculateCompletionPercentage(profile);
            bool isCompleted = CanStartAssessment(completionPercentage);

            return new ApiResponse<object>
            {
                Success = true,
                Message = "Completion Status Loaded",
                StatusCode = 200,
                Data = new
                {
                    completionPercentage = completionPercentage,
                    isCompleted = isCompleted
                }
            };
        }

        private int CalculateCompletionPercentage(StudentProfile profile)
        {
            int percentage = 0;

            if (!string.IsNullOrWhiteSpace(profile.CollegeName)) percentage += 10;
            if (!string.IsNullOrWhiteSpace(profile.Degree)) percentage += 10;
            if (!string.IsNullOrWhiteSpace(profile.Branch)) percentage += 10;
            if (profile.AcademicYear > 0) percentage += 10;
            if (profile.CGPA > 0) percentage += 10;
            if (!string.IsNullOrWhiteSpace(profile.PreferredLocation)) percentage += 15;
            if (!string.IsNullOrWhiteSpace(profile.CareerInterest)) percentage += 20;
            if (!string.IsNullOrWhiteSpace(profile.Bio)) percentage += 15;

            return percentage;
        }

        private bool CanStartAssessment(int completionPercentage)
        {
            return completionPercentage >= 80;
        }

        private StudentProfileResponseDto MapToResponseDto(StudentProfile profile)
        {
            return new StudentProfileResponseDto
            {
                ProfileId = profile.Id,
                UserId = profile.UserId,
                CollegeName = profile.CollegeName,
                Degree = profile.Degree,
                Branch = profile.Branch,
                AcademicYear = profile.AcademicYear,
                CGPA = profile.CGPA,
                PreferredLocation = profile.PreferredLocation,
                CareerInterest = profile.CareerInterest,
                Bio = profile.Bio,
                ProfileCompletionPercentage = CalculateCompletionPercentage(profile),
                CreatedAt = profile.CreatedAt,
                UpdatedAt = profile.UpdatedAt
            };
        }
    }
}
