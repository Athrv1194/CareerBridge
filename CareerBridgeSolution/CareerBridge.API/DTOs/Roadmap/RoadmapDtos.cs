using System;
using System.Collections.Generic;

namespace CareerBridge.API.DTOs.Roadmap
{
    public class RoadmapResponseDto
    {
        public int CareerId { get; set; }
        public string CareerTitle { get; set; } = string.Empty;
        public int OverallProgress { get; set; }
        public string CurrentSkill { get; set; } = string.Empty;
        public string EstimatedCompletion { get; set; } = string.Empty;
        public List<RoadmapSkillDto> Skills { get; set; } = new List<RoadmapSkillDto>();
    }

    public class RoadmapSkillDto
    {
        public int RoadmapStepId { get; set; }
        public string SkillName { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;
        public int EstimatedDays { get; set; }
        public int Order { get; set; }
        public List<string> Topics { get; set; } = new List<string>();
    }

    public class CurrentLearningDto
    {
        public string Skill { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;
        public int Progress { get; set; }
    }

    public class RoadmapProgressDto
    {
        public int Completed { get; set; }
        public int Total { get; set; }
        public int Percentage { get; set; }
    }

    public class StatusUpdateDto
    {
        public int RoadmapStepId { get; set; }
        public string Status { get; set; } = string.Empty;
    }
}
