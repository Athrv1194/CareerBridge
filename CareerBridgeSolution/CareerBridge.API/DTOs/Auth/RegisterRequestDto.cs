using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using Newtonsoft.Json;

namespace CareerBridge.API.DTOs.Auth
{
    public class RegisterRequestDto
    {
        [Required(ErrorMessage = "FullName is required")]
        [MinLength(2, ErrorMessage = "FullName must be at least 2 characters")]
        [JsonPropertyName("name")]
        [JsonProperty("name")]
        public string FullName { get; set; } = string.Empty;

        [Required(ErrorMessage = "Email is required")]
        [EmailAddress(ErrorMessage = "Invalid Email Address")]
        public string Email { get; set; } = string.Empty;

        [Required(ErrorMessage = "Password is required")]
        [MinLength(6, ErrorMessage = "Password must be at least 6 characters")]
        public string Password { get; set; } = string.Empty;
    }
}

