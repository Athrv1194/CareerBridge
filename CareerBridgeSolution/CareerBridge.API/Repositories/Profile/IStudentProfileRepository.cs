using System.Threading.Tasks;
using CareerBridge.API.Models;

namespace CareerBridge.API.Repositories.Profile
{
    public interface IStudentProfileRepository
    {
        Task<StudentProfile?> GetByUserIdAsync(int userId);
        Task<StudentProfile> CreateAsync(StudentProfile profile);
        Task<StudentProfile> UpdateAsync(StudentProfile profile);
        Task<bool> ExistsByUserIdAsync(int userId);
    }
}
