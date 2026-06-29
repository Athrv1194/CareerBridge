using CareerBridge.API.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace CareerBridge.API.Data
{
    public static class DbSeeder
    {
        public static async Task SeedAsync(AppDbContext context)
        {
            // Seed CareerPaths if empty
            if (!await context.CareerPaths.AnyAsync())
            {
                var paths = new[]
                {
                    new CareerPath { Title = "Frontend Developer", Description = "Build beautiful and interactive user interfaces using modern web technologies." },
                    new CareerPath { Title = "Backend Developer", Description = "Build high-performance, secure, and scalable server-side systems and APIs." }
                };
                context.CareerPaths.AddRange(paths);
                await context.SaveChangesAsync();
            }

            // Seed Skills if empty
            if (!await context.Skills.AnyAsync())
            {
                var skills = new[]
                {
                    new Skill { Name = "HTML & CSS", Description = "Learn the structure and styling of web pages." },
                    new Skill { Name = "JavaScript", Description = "Master core scripting language functions and DOM manipulation." },
                    new Skill { Name = "React", Description = "Build dynamic single-page applications using component-based architecture." },
                    new Skill { Name = "C# & .NET", Description = "Learn enterprise application development on the .NET framework." },
                    new Skill { Name = "SQL Server", Description = "Understand relational database management, schema design, and queries." },
                    new Skill { Name = "EF Core", Description = "Use Entity Framework Core as an Object-Relational Mapper (ORM)." }
                };
                context.Skills.AddRange(skills);
                await context.SaveChangesAsync();
            }

            // Seed RoadmapSteps if empty
            if (!await context.RoadmapSteps.AnyAsync())
            {
                var frontendPath = await context.CareerPaths.FirstAsync(p => p.Title == "Frontend Developer");
                var backendPath = await context.CareerPaths.FirstAsync(p => p.Title == "Backend Developer");

                var htmlCss = await context.Skills.FirstAsync(s => s.Name == "HTML & CSS");
                var js = await context.Skills.FirstAsync(s => s.Name == "JavaScript");
                var react = await context.Skills.FirstAsync(s => s.Name == "React");

                var csharp = await context.Skills.FirstAsync(s => s.Name == "C# & .NET");
                var sql = await context.Skills.FirstAsync(s => s.Name == "SQL Server");
                var ef = await context.Skills.FirstAsync(s => s.Name == "EF Core");

                var steps = new[]
                {
                    new RoadmapStep { CareerPathId = frontendPath.Id, CareerPath = frontendPath, SkillId = htmlCss.Id, Skill = htmlCss, Order = 1 },
                    new RoadmapStep { CareerPathId = frontendPath.Id, CareerPath = frontendPath, SkillId = js.Id, Skill = js, Order = 2 },
                    new RoadmapStep { CareerPathId = frontendPath.Id, CareerPath = frontendPath, SkillId = react.Id, Skill = react, Order = 3 },

                    new RoadmapStep { CareerPathId = backendPath.Id, CareerPath = backendPath, SkillId = csharp.Id, Skill = csharp, Order = 1 },
                    new RoadmapStep { CareerPathId = backendPath.Id, CareerPath = backendPath, SkillId = sql.Id, Skill = sql, Order = 2 },
                    new RoadmapStep { CareerPathId = backendPath.Id, CareerPath = backendPath, SkillId = ef.Id, Skill = ef, Order = 3 }
                };

                context.RoadmapSteps.AddRange(steps);
                await context.SaveChangesAsync();
            }
        }
    }
}
