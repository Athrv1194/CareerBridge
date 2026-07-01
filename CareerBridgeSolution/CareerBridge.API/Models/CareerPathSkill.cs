namespace CareerBridge.API.Models
{
    public class CareerPathSkill
    {
        public int Id { get; set; }
        public int CareerPathId { get; set; }
        public int SkillId { get; set; }
        public int LearningOrder { get; set; }

        public CareerPath? CareerPath { get; set; }
        public Skill? Skill { get; set; }
    }
}