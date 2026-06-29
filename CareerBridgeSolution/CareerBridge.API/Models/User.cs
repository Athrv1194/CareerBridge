using System.ComponentModel.DataAnnotations;

namespace CareerBridge.API.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(100)]
        public required string Username { get; set; }

        [Required]
        [EmailAddress]
        [MaxLength(150)]
        public required string Email { get; set; }

        public ICollection<UserProgress> UserProgresses { get; set; } = new List<UserProgress>();
    }
}
