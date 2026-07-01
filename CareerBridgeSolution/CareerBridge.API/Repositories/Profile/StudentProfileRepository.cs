using System.Threading.Tasks;
using CareerBridge.API.Data;
using CareerBridge.API.Models;
using Microsoft.EntityFrameworkCore;

namespace CareerBridge.API.Repositories.Profile
{
    public class StudentProfileRepository : IStudentProfileRepository
    {
        private readonly AppDbContext _context;

        public StudentProfileRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<StudentProfile?> GetByUserIdAsync(int userId)
        {
            return await _context.StudentProfiles
                .FirstOrDefaultAsync(p => p.UserId == userId);
        }

        public async Task<StudentProfile> CreateAsync(StudentProfile profile)
        {
            await _context.StudentProfiles.AddAsync(profile);
            await _context.SaveChangesAsync();
            return profile;
        }

        public async Task<StudentProfile> UpdateAsync(StudentProfile profile)
        {
            _context.StudentProfiles.Update(profile);
            await _context.SaveChangesAsync();
            return profile;
        }

        public async Task<bool> ExistsByUserIdAsync(int userId)
        {
            return await _context.StudentProfiles.AnyAsync(p => p.UserId == userId);
        }
    }
}
