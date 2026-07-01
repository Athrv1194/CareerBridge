using CareerBridge.API.DTOs.User;

namespace CareerBridge.API.DTOs.Auth
{
    public class LoginResponseDto
    {
        public string Token { get; set; } = string.Empty;
        public System.DateTime Expires { get; set; }
        public UserDto User { get; set; } = null!;
    }
}
