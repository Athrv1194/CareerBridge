using System.Collections.Generic;

namespace CareerBridge.API.DTOs.Dashboard
{
    public class DashboardDto
    {
        public StudentSummaryDto Student { get; set; } = new StudentSummaryDto();
        public CareerSummaryDto Career { get; set; } = new CareerSummaryDto();
        public RoadmapSummaryDto Roadmap { get; set; } = new RoadmapSummaryDto();
        public PlacementSummaryDto PlacementReadiness { get; set; } = new PlacementSummaryDto();
        public List<ProjectDto> Projects { get; set; } = new List<ProjectDto>();
        public List<MentorSuggestionDto> MentorSuggestions { get; set; } = new List<MentorSuggestionDto>();
        public List<OpportunityDto> Opportunities { get; set; } = new List<OpportunityDto>();
        public List<ActivityDto> RecentActivity { get; set; } = new List<ActivityDto>();
    }

    public class DashboardSummaryDto
    {
        public int ProfileCompletion { get; set; }
        public int RoadmapProgress { get; set; }
        public int PlacementReadiness { get; set; }
        public string CurrentSkill { get; set; } = string.Empty;
    }

    public class StudentSummaryDto
    {
        public string Name { get; set; } = string.Empty;
        public string College { get; set; } = string.Empty;
        public int ProfileCompletion { get; set; }
        public string Degree { get; set; } = string.Empty;
        public int Semester { get; set; }
        public decimal CGPA { get; set; }
        public string PreferredLocation { get; set; } = string.Empty;
    }

    public class CareerSummaryDto
    {
        public string CareerTitle { get; set; } = string.Empty;
        public int MatchPercentage { get; set; }
        public string IndustryDemand { get; set; } = string.Empty;
        public string EstimatedDuration { get; set; } = string.Empty;
    }

    public class RoadmapSummaryDto
    {
        public int OverallProgress { get; set; }
        public int CompletedSkills { get; set; }
        public int TotalSkills { get; set; }
        public string CurrentSkill { get; set; } = string.Empty;
        public int LearningSkills { get; set; }
        public int PracticingSkills { get; set; }
        public int NotStartedSkills { get; set; }
        public int VerifiedSkills { get; set; }
        public string EstimatedCompletion { get; set; } = string.Empty;
    }

    public class PlacementSummaryDto
    {
        public int OverallScore { get; set; }
        public int RoadmapScore { get; set; }
        public int AssessmentScore { get; set; }
        public int ProfileScore { get; set; }
        public int ProjectScore { get; set; }
        public int ResumeScore { get; set; }
    }

    public class ProjectDto
    {
        public string Title { get; set; } = string.Empty;
        public string Difficulty { get; set; } = string.Empty;
        public string SkillsCovered { get; set; } = string.Empty;
        public string ShortDescription { get; set; } = string.Empty;
        public string GitHubLink { get; set; } = string.Empty;
    }

    public class MentorSuggestionDto
    {
        public string Suggestion { get; set; } = string.Empty;
    }

    public class OpportunityDto
    {
        public string Title { get; set; } = string.Empty;
        public string Company { get; set; } = string.Empty;
        public string Location { get; set; } = string.Empty;
        public string Eligibility { get; set; } = string.Empty;
    }

    public class ActivityDto
    {
        public string Title { get; set; } = string.Empty;
        public string Date { get; set; } = string.Empty;
    }
}
