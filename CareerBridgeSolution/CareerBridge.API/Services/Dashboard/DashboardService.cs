using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CareerBridge.API.DTOs.Dashboard;
using CareerBridge.API.Enums;
using CareerBridge.API.Repositories.Dashboard;
using CareerBridge.API.Responses;

namespace CareerBridge.API.Services.Dashboard
{
    public class DashboardService : IDashboardService
    {
        private readonly IDashboardRepository _repository;

        public DashboardService(IDashboardRepository repository)
        {
            _repository = repository;
        }

        public async Task<ApiResponse<DashboardDto>> GetDashboardAsync(int userId)
        {
            var profile = await _repository.GetStudentProfileAsync(userId);
            if (profile == null)
            {
                return new ApiResponse<DashboardDto>
                {
                    Success = false,
                    Message = "Complete your profile first.",
                    StatusCode = 400
                };
            }

            var recommendation = await _repository.GetLatestRecommendationAsync(userId);
            if (recommendation == null)
            {
                return new ApiResponse<DashboardDto>
                {
                    Success = false,
                    Message = "Complete Career Assessment first.",
                    StatusCode = 400
                };
            }

            var roadmap = await _repository.GetRoadmapWithProgressAsync(userId);
            if (roadmap == null)
            {
                return new ApiResponse<DashboardDto>
                {
                    Success = false,
                    Message = "Generate your roadmap first.",
                    StatusCode = 400
                };
            }

            var progressList = await _repository.GetRoadmapProgressAsync(userId);
            var readiness = await _repository.GetPlacementReadinessAsync(userId);

            int profileCompletion = 100; // Simplified for dashboard
            
            var dashboardDto = new DashboardDto();

            dashboardDto.Student = new StudentSummaryDto
            {
                Name = profile.User?.FullName ?? "Student",
                College = profile.CollegeName,
                Degree = profile.Degree,
                Semester = 8, // Default static for mini project
                CGPA = profile.CGPA,
                PreferredLocation = profile.PreferredLocation,
                ProfileCompletion = profileCompletion
            };

            if (recommendation != null && recommendation.CareerPath != null)
            {
                dashboardDto.Career = new CareerSummaryDto
                {
                    CareerTitle = recommendation.CareerPath.Title,
                    MatchPercentage = (int)recommendation.MatchPercentage,
                    IndustryDemand = recommendation.CareerPath.IndustryDemand,
                    EstimatedDuration = $"{recommendation.CareerPath.DurationMonths} Months"
                };
            }

            if (roadmap != null && progressList != null)
            {
                int totalSteps = progressList.Count;
                int completedSteps = progressList.Count(p => p.Status == RoadmapStatus.Completed || p.Status == RoadmapStatus.Verified);
                int overallProgress = totalSteps == 0 ? 0 : (completedSteps * 100) / totalSteps;

                var currentStep = progressList.FirstOrDefault(p => p.Status != RoadmapStatus.Completed && p.Status != RoadmapStatus.Verified);
                var currentSkill = currentStep?.RoadmapStep?.Title ?? "All Completed";

                int remainingHours = progressList
                    .Where(p => p.Status != RoadmapStatus.Completed && p.Status != RoadmapStatus.Verified)
                    .Sum(p => p.RoadmapStep?.EstimatedHours ?? 0);
                
                int remainingMonths = (int)Math.Ceiling(remainingHours / 40.0);
                string estimatedCompletion = remainingMonths > 0 ? $"{remainingMonths} Months" : "Ready for Placement";

                dashboardDto.Roadmap = new RoadmapSummaryDto
                {
                    OverallProgress = overallProgress,
                    CompletedSkills = completedSteps,
                    TotalSkills = totalSteps,
                    CurrentSkill = currentSkill,
                    LearningSkills = progressList.Count(p => p.Status == RoadmapStatus.Learning),
                    PracticingSkills = progressList.Count(p => p.Status == RoadmapStatus.Practicing),
                    NotStartedSkills = progressList.Count(p => p.Status == RoadmapStatus.NotStarted),
                    VerifiedSkills = progressList.Count(p => p.Status == RoadmapStatus.Verified),
                    EstimatedCompletion = estimatedCompletion
                };
            }

            if (readiness != null)
            {
                dashboardDto.PlacementReadiness = new PlacementSummaryDto
                {
                    OverallScore = readiness.OverallScore,
                    RoadmapScore = readiness.RoadmapScore,
                    AssessmentScore = readiness.AssessmentScore,
                    ProfileScore = readiness.SkillScore,
                    ProjectScore = 20, // Fixed for mini project
                    ResumeScore = 15 // Fixed for mini project
                };
            }

            // Mock Static Recommended Projects
            dashboardDto.Projects = new List<ProjectDto>
            {
                new ProjectDto { Title = "Hospital Management System", Difficulty = "Intermediate", SkillsCovered = "C#, .NET Core, SQL", ShortDescription = "A complete REST API for hospital tracking.", GitHubLink = "#" },
                new ProjectDto { Title = "E-Commerce Platform", Difficulty = "Advanced", SkillsCovered = "ASP.NET, React, SQL", ShortDescription = "Full-stack e-commerce solution.", GitHubLink = "#" },
                new ProjectDto { Title = "Employee Portal", Difficulty = "Beginner", SkillsCovered = "C#, Entity Framework", ShortDescription = "Simple CRUD application.", GitHubLink = "#" }
            };

            // Mock Static Mentor Suggestions
            dashboardDto.MentorSuggestions = new List<MentorSuggestionDto>
            {
                new MentorSuggestionDto { Suggestion = "Practice ASP.NET Core REST APIs." },
                new MentorSuggestionDto { Suggestion = "Focus on Entity Framework Code-First approach." },
                new MentorSuggestionDto { Suggestion = "Build one CRUD project to solidify your backend skills." }
            };

            // Mock Static Opportunities
            dashboardDto.Opportunities = new List<OpportunityDto>
            {
                new OpportunityDto { Title = "Software Engineering Intern", Company = "TechCorp", Location = "Bangalore", Eligibility = "Pre-final year" },
                new OpportunityDto { Title = "Backend Hackathon", Company = "InnovateXYZ", Location = "Online", Eligibility = "Any" },
                new OpportunityDto { Title = "Graduate Trainee Program", Company = "GlobalTech", Location = "Pune", Eligibility = "Final year" }
            };

            var activityResponse = await GetRecentActivityAsync(userId);
            if (activityResponse.Success && activityResponse.Data != null)
            {
                dashboardDto.RecentActivity = activityResponse.Data;
            }

            return new ApiResponse<DashboardDto>
            {
                Success = true,
                Message = "Dashboard loaded successfully.",
                StatusCode = 200,
                Data = dashboardDto
            };
        }

        public async Task<ApiResponse<DashboardSummaryDto>> GetDashboardSummaryAsync(int userId)
        {
            var profile = await _repository.GetStudentProfileAsync(userId);
            if (profile == null)
            {
                return new ApiResponse<DashboardSummaryDto>
                {
                    Success = false,
                    Message = "Complete your profile first.",
                    StatusCode = 400
                };
            }

            var roadmap = await _repository.GetRoadmapWithProgressAsync(userId);
            if (roadmap == null)
            {
                return new ApiResponse<DashboardSummaryDto>
                {
                    Success = false,
                    Message = "Generate your roadmap first.",
                    StatusCode = 400
                };
            }

            var progressList = await _repository.GetRoadmapProgressAsync(userId);
            var readiness = await _repository.GetPlacementReadinessAsync(userId);

            int totalSteps = progressList.Count;
            int completedSteps = progressList.Count(p => p.Status == RoadmapStatus.Completed || p.Status == RoadmapStatus.Verified);
            int roadmapProgress = totalSteps == 0 ? 0 : (completedSteps * 100) / totalSteps;

            var currentStep = progressList.FirstOrDefault(p => p.Status != RoadmapStatus.Completed && p.Status != RoadmapStatus.Verified);
            var currentSkill = currentStep?.RoadmapStep?.Title ?? "All Completed";

            var summary = new DashboardSummaryDto
            {
                ProfileCompletion = 100,
                RoadmapProgress = roadmapProgress,
                PlacementReadiness = readiness?.OverallScore ?? 0,
                CurrentSkill = currentSkill
            };

            return new ApiResponse<DashboardSummaryDto>
            {
                Success = true,
                Message = "Summary loaded successfully.",
                StatusCode = 200,
                Data = summary
            };
        }

        public async Task<ApiResponse<List<ActivityDto>>> GetRecentActivityAsync(int userId)
        {
            var activities = new List<ActivityDto>();

            var profile = await _repository.GetStudentProfileAsync(userId);
            if (profile != null)
            {
                activities.Add(new ActivityDto { Title = "Profile Completed", Date = profile.UpdatedAt.ToString("yyyy-MM-dd") });
            }

            var assessment = await _repository.GetLatestAssessmentAsync(userId);
            if (assessment != null)
            {
                activities.Add(new ActivityDto { Title = "Assessment Completed", Date = assessment.SubmittedAt.ToString("yyyy-MM-dd") });
            }

            var recommendation = await _repository.GetLatestRecommendationAsync(userId);
            if (recommendation != null)
            {
                activities.Add(new ActivityDto { Title = "Recommendation Generated", Date = recommendation.GeneratedAt.ToString("yyyy-MM-dd") });
            }

            var roadmap = await _repository.GetRoadmapWithProgressAsync(userId);
            if (roadmap != null)
            {
                activities.Add(new ActivityDto { Title = "Roadmap Started", Date = roadmap.CreatedAt.ToString("yyyy-MM-dd") });
            }

            var progressList = await _repository.GetRoadmapProgressAsync(userId);
            var recentSkill = progressList.Where(p => p.CompletedDate.HasValue).OrderByDescending(p => p.CompletedDate).FirstOrDefault();
            if (recentSkill != null && recentSkill.CompletedDate.HasValue)
            {
                activities.Add(new ActivityDto { Title = $"Completed Skill: {recentSkill.RoadmapStep?.Title}", Date = recentSkill.CompletedDate.Value.ToString("yyyy-MM-dd") });
            }

            // Sort by Date descending and take latest 5
            var latestActivities = activities
                .OrderByDescending(a => a.Date)
                .Take(5)
                .ToList();

            return new ApiResponse<List<ActivityDto>>
            {
                Success = true,
                Message = "Recent activities loaded.",
                StatusCode = 200,
                Data = latestActivities
            };
        }
    }
}
