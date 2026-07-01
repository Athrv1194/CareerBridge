using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CareerBridge.API.DTOs.Assessment;
using CareerBridge.API.Models;
using CareerBridge.API.Repositories.Assessment;
using CareerBridge.API.Services.Profile;
using CareerBridge.API.Responses;

namespace CareerBridge.API.Services.Assessment
{
    public class AssessmentService : IAssessmentService
    {
        private readonly IAssessmentRepository _repository;
        private readonly IStudentProfileService _profileService;

        public AssessmentService(IAssessmentRepository repository, IStudentProfileService profileService)
        {
            _repository = repository;
            _profileService = profileService;
        }

        public async Task<ApiResponse<List<AssessmentQuestionDto>>> GetQuestionsAsync()
        {
            var questions = await _repository.GetQuestionsAsync();
            var dtos = questions.Select(q => new AssessmentQuestionDto
            {
                QuestionId = q.Id,
                Question = q.Question,
                Category = q.Category,
                DisplayOrder = q.DisplayOrder,
                Options = q.AssessmentOptions.Select(o => new AssessmentOptionDto
                {
                    OptionId = o.Id,
                    OptionText = o.OptionText
                }).ToList()
            }).ToList();

            return new ApiResponse<List<AssessmentQuestionDto>>
            {
                Success = true,
                Message = "Assessment questions loaded successfully.",
                StatusCode = 200,
                Data = dtos
            };
        }

        public async Task<ApiResponse<object>> SubmitAssessmentAsync(int userId, SubmitAssessmentDto request)
        {
            // 1. Validate Profile Completion
            var profileResult = await _profileService.GetProfileAsync(userId);
            if (!profileResult.Success || profileResult.Data == null || profileResult.Data.ProfileCompletionPercentage < 80)
            {
                return new ApiResponse<object>
                {
                    Success = false,
                    Message = "Complete your profile before starting assessment.",
                    StatusCode = 403
                };
            }

            // 2. Validate Question Completeness (ensure all questions answered)
            var allQuestions = await _repository.GetQuestionsAsync();
            if (request.Answers.Count != allQuestions.Count)
            {
                return new ApiResponse<object>
                {
                    Success = false,
                    Message = "Please answer all questions.",
                    StatusCode = 400
                };
            }

            // Check for duplicates
            if (request.Answers.Select(a => a.QuestionId).Distinct().Count() != request.Answers.Count)
            {
                return new ApiResponse<object>
                {
                    Success = false,
                    Message = "Duplicate answers found.",
                    StatusCode = 400
                };
            }

            // 3. Scoring Engine
            var careerScores = new Dictionary<int, int>();
            var userAnswers = new List<UserAssessmentAnswer>();

            foreach (var answerDto in request.Answers)
            {
                var option = await _repository.GetOptionAsync(answerDto.OptionId);
                if (option == null || option.QuestionId != answerDto.QuestionId)
                {
                    return new ApiResponse<object>
                    {
                        Success = false,
                        Message = "Invalid Option selected.",
                        StatusCode = 400
                    };
                }

                userAnswers.Add(new UserAssessmentAnswer
                {
                    QuestionId = answerDto.QuestionId,
                    OptionId = answerDto.OptionId
                });

                if (option.CareerPathId.HasValue)
                {
                    if (!careerScores.ContainsKey(option.CareerPathId.Value))
                    {
                        careerScores[option.CareerPathId.Value] = 0;
                    }
                    careerScores[option.CareerPathId.Value] += option.Weight;
                }
            }

            if (!careerScores.Any())
            {
                return new ApiResponse<object>
                {
                    Success = false,
                    Message = "No career matches found based on answers.",
                    StatusCode = 400
                };
            }

            // 4. Calculate Max Possible Scores for Match Percentage
            var maxScores = CalculateMaxScores(allQuestions);

            var careerPaths = await _repository.GetCareerPathsAsync();

            int bestCareerId = 0;
            decimal highestMatch = -1;
            int highestTieBreaker = -1;

            foreach (var kvp in careerScores)
            {
                var careerId = kvp.Key;
                var score = kvp.Value;
                var maxPossible = maxScores.ContainsKey(careerId) && maxScores[careerId] > 0 ? maxScores[careerId] : 1;
                var matchPercentage = (decimal)score / maxPossible * 100;

                var careerPath = careerPaths.FirstOrDefault(c => c.Id == careerId);
                int tieBreaker = careerPath != null ? GetIndustryDemandScore(careerPath.IndustryDemand) : 0;

                if (matchPercentage > highestMatch || (matchPercentage == highestMatch && tieBreaker > highestTieBreaker))
                {
                    highestMatch = matchPercentage;
                    bestCareerId = careerId;
                    highestTieBreaker = tieBreaker;
                }
            }

            if (highestMatch > 100) highestMatch = 100; // Cap at 100%

            // 5. Persistence
            var assessment = new UserAssessment
            {
                UserId = userId,
                Completed = true,
                SubmittedAt = DateTime.UtcNow,
                Answers = userAnswers
            };

            await _repository.SaveAssessmentAsync(assessment);

            var recommendation = new CareerRecommendation
            {
                UserId = userId,
                CareerPathId = bestCareerId,
                MatchPercentage = Math.Round(highestMatch),
                RecommendationReason = "Based on your answers across skills and interests.",
                GeneratedAt = DateTime.UtcNow
            };

            await _repository.SaveRecommendationAsync(recommendation);

            return new ApiResponse<object>
            {
                Success = true,
                Message = "Career Assessment completed successfully.",
                StatusCode = 200,
                Data = new
                {
                    assessmentCompleted = true,
                    nextStep = "Career Recommendation"
                }
            };
        }

        public async Task<ApiResponse<AssessmentResultDto>> GetResultAsync(int userId)
        {
            var assessment = await _repository.GetAssessmentByUserIdAsync(userId);
            var recommendation = await _repository.GetLatestRecommendationAsync(userId);

            if (assessment == null || recommendation == null)
            {
                return new ApiResponse<AssessmentResultDto>
                {
                    Success = false,
                    Message = "No assessment result found.",
                    StatusCode = 404
                };
            }

            var resultDto = new AssessmentResultDto
            {
                AssessmentId = assessment.Id,
                Completed = assessment.Completed,
                SubmittedAt = assessment.SubmittedAt,
                RecommendedCareerId = recommendation.CareerPathId,
                RecommendedCareerName = recommendation.CareerPath?.Title ?? "",
                MatchPercentage = (int)recommendation.MatchPercentage
            };

            return new ApiResponse<AssessmentResultDto>
            {
                Success = true,
                Message = "Assessment result loaded.",
                StatusCode = 200,
                Data = resultDto
            };
        }

        private Dictionary<int, int> CalculateMaxScores(List<AssessmentQuestion> allQuestions)
        {
            var maxScores = new Dictionary<int, int>();
            foreach (var q in allQuestions)
            {
                var groupedOptions = q.AssessmentOptions
                    .Where(o => o.CareerPathId.HasValue)
                    .GroupBy(o => o.CareerPathId.GetValueOrDefault());

                foreach (var group in groupedOptions)
                {
                    var maxWeightForCareer = group.Max(o => o.Weight);
                    if (!maxScores.ContainsKey(group.Key))
                        maxScores[group.Key] = 0;
                    maxScores[group.Key] += maxWeightForCareer;
                }
            }
            return maxScores;
        }

        private int GetIndustryDemandScore(string demand)
        {
            if (string.IsNullOrWhiteSpace(demand)) return 0;
            var d = demand.Trim().ToLower();
            if (d.Contains("very high")) return 3;
            if (d.Contains("high")) return 2;
            if (d.Contains("medium")) return 1;
            return 0;
        }
    }
}
