namespace CareerBridge.API.Services.Auth
{
    public interface IJwtService
    {
        string GenerateToken(int userId, string email, string role);
        DateTime GetExpiry();
    }
}
