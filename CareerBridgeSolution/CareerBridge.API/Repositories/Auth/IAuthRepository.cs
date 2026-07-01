using CareerBridge.API.Models;

namespace CareerBridge.API.Repositories.Auth
{
    public interface IAuthRepository
    {
        Task<User?> GetUserByEmailAsync(string email);
        Task<User> CreateUserAsync(User user);
        Task<bool> EmailExistsAsync(string email);
    }
}
