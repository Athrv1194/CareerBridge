using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CareerBridge.API.Data;
using CareerBridge.API.Enums;
using CareerBridge.API.Helpers;
using CareerBridge.API.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace CareerBridge.API.Seed
{
    public static class DbSeeder
    {
        public static async Task SeedAsync(IServiceScope scope)
        {
            var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();
            await context.Database.MigrateAsync();

            if (!context.CareerPaths.Any())
            {
                var paths = new List<CareerPath>
                {
                    new CareerPath { Title = ".NET Developer", Description = "Build enterprise apps using C# and .NET", AverageSalary = 90000, IndustryDemand = "High", CareerLevel = "Beginner to Advanced", DurationMonths = 6, ImageUrl = "/assets/net.png" },
                    new CareerPath { Title = "Java Developer", Description = "Build scalable backend systems with Java", AverageSalary = 95000, IndustryDemand = "High", CareerLevel = "Beginner to Advanced", DurationMonths = 6, ImageUrl = "/assets/java.png" },
                    new CareerPath { Title = "MERN Stack Developer", Description = "Full-stack development using MongoDB, Express, React, Node", AverageSalary = 85000, IndustryDemand = "High", CareerLevel = "Beginner to Advanced", DurationMonths = 5, ImageUrl = "/assets/mern.png" },
                    new CareerPath { Title = "Frontend Developer", Description = "Create beautiful UIs with HTML, CSS, React", AverageSalary = 75000, IndustryDemand = "High", CareerLevel = "Beginner", DurationMonths = 4, ImageUrl = "/assets/frontend.png" },
                    new CareerPath { Title = "Data Analyst", Description = "Analyze data using Python, SQL, and PowerBI", AverageSalary = 80000, IndustryDemand = "High", CareerLevel = "Beginner to Intermediate", DurationMonths = 5, ImageUrl = "/assets/data.png" }
                };
                await context.CareerPaths.AddRangeAsync(paths);
                await context.SaveChangesAsync();
            }

            if (!context.Skills.Any())
            {
                var skills = new List<Skill>
                {
                    new Skill { Name = "C#", Category = "Programming Language", Description = "Core language for .NET", Difficulty = SkillDifficulty.Intermediate, EstimatedLearningHours = 40 },
                    new Skill { Name = "ASP.NET Core", Category = "Framework", Description = "Web framework", Difficulty = SkillDifficulty.Intermediate, EstimatedLearningHours = 50 },
                    new Skill { Name = "Entity Framework Core", Category = "ORM", Description = "Data access", Difficulty = SkillDifficulty.Intermediate, EstimatedLearningHours = 30 },
                    new Skill { Name = "SQL Server", Category = "Database", Description = "Relational database", Difficulty = SkillDifficulty.Intermediate, EstimatedLearningHours = 40 },
                    new Skill { Name = "HTML", Category = "Frontend", Description = "Markup language", Difficulty = SkillDifficulty.Beginner, EstimatedLearningHours = 10 },
                    new Skill { Name = "CSS", Category = "Frontend", Description = "Styling language", Difficulty = SkillDifficulty.Beginner, EstimatedLearningHours = 20 },
                    new Skill { Name = "JavaScript", Category = "Programming Language", Description = "Web scripting", Difficulty = SkillDifficulty.Beginner, EstimatedLearningHours = 40 },
                    new Skill { Name = "React", Category = "Frontend Framework", Description = "UI library", Difficulty = SkillDifficulty.Intermediate, EstimatedLearningHours = 50 },
                    new Skill { Name = "Java", Category = "Programming Language", Description = "Enterprise backend", Difficulty = SkillDifficulty.Intermediate, EstimatedLearningHours = 60 },
                    new Skill { Name = "Spring Boot", Category = "Framework", Description = "Java framework", Difficulty = SkillDifficulty.Advanced, EstimatedLearningHours = 60 },
                    new Skill { Name = "Node.js", Category = "Backend", Description = "JS runtime", Difficulty = SkillDifficulty.Intermediate, EstimatedLearningHours = 40 },
                    new Skill { Name = "Express", Category = "Framework", Description = "Node framework", Difficulty = SkillDifficulty.Intermediate, EstimatedLearningHours = 20 },
                    new Skill { Name = "MongoDB", Category = "Database", Description = "NoSQL database", Difficulty = SkillDifficulty.Beginner, EstimatedLearningHours = 30 },
                    new Skill { Name = "Python", Category = "Programming Language", Description = "Data analysis & backend", Difficulty = SkillDifficulty.Beginner, EstimatedLearningHours = 40 },
                    new Skill { Name = "Pandas", Category = "Data Library", Description = "Data manipulation", Difficulty = SkillDifficulty.Intermediate, EstimatedLearningHours = 30 },
                    new Skill { Name = "PowerBI", Category = "Tool", Description = "Data visualization", Difficulty = SkillDifficulty.Beginner, EstimatedLearningHours = 20 },
                    new Skill { Name = "Git", Category = "Tool", Description = "Version control", Difficulty = SkillDifficulty.Beginner, EstimatedLearningHours = 10 },
                    new Skill { Name = "REST API", Category = "Concept", Description = "API architecture", Difficulty = SkillDifficulty.Intermediate, EstimatedLearningHours = 20 },
                    new Skill { Name = "JWT", Category = "Security", Description = "Authentication tokens", Difficulty = SkillDifficulty.Intermediate, EstimatedLearningHours = 15 },
                    new Skill { Name = "LINQ", Category = "Concept", Description = "Language Integrated Query", Difficulty = SkillDifficulty.Intermediate, EstimatedLearningHours = 15 }
                };
                await context.Skills.AddRangeAsync(skills);
                await context.SaveChangesAsync();
            }

            if (!context.CareerPathSkills.Any())
            {
                var netPath = await context.CareerPaths.FirstOrDefaultAsync(c => c.Title == ".NET Developer");
                var csSkill = await context.Skills.FirstOrDefaultAsync(s => s.Name == "C#");
                var aspSkill = await context.Skills.FirstOrDefaultAsync(s => s.Name == "ASP.NET Core");
                var efSkill = await context.Skills.FirstOrDefaultAsync(s => s.Name == "Entity Framework Core");
                var sqlSkill = await context.Skills.FirstOrDefaultAsync(s => s.Name == "SQL Server");
                var linqSkill = await context.Skills.FirstOrDefaultAsync(s => s.Name == "LINQ");
                var restSkill = await context.Skills.FirstOrDefaultAsync(s => s.Name == "REST API");

                if (netPath != null)
                {
                    context.CareerPathSkills.AddRange(
                        new CareerPathSkill { CareerPathId = netPath.Id, SkillId = csSkill!.Id, LearningOrder = 1 },
                        new CareerPathSkill { CareerPathId = netPath.Id, SkillId = linqSkill!.Id, LearningOrder = 2 },
                        new CareerPathSkill { CareerPathId = netPath.Id, SkillId = sqlSkill!.Id, LearningOrder = 3 },
                        new CareerPathSkill { CareerPathId = netPath.Id, SkillId = efSkill!.Id, LearningOrder = 4 },
                        new CareerPathSkill { CareerPathId = netPath.Id, SkillId = aspSkill!.Id, LearningOrder = 5 },
                        new CareerPathSkill { CareerPathId = netPath.Id, SkillId = restSkill!.Id, LearningOrder = 6 }
                    );
                    await context.SaveChangesAsync();
                }
            }

            if (!context.AssessmentQuestions.Any())
            {
                var netPath = await context.CareerPaths.FirstOrDefaultAsync(c => c.Title == ".NET Developer");
                var mernPath = await context.CareerPaths.FirstOrDefaultAsync(c => c.Title == "MERN Stack Developer");
                var dataPath = await context.CareerPaths.FirstOrDefaultAsync(c => c.Title == "Data Analyst");
                var frontPath = await context.CareerPaths.FirstOrDefaultAsync(c => c.Title == "Frontend Developer");
                var javaPath = await context.CareerPaths.FirstOrDefaultAsync(c => c.Title == "Java Developer");

                var questions = new List<AssessmentQuestion>();
                for (int i = 1; i <= 30; i++)
                {
                    var q = new AssessmentQuestion
                    {
                        Question = $"Assessment Question {i} - What do you prefer?",
                        Category = "Programming",
                        DisplayOrder = i
                    };
                    
                    q.AssessmentOptions.Add(new AssessmentOption { OptionText = "Enterprise C#", CareerPathId = netPath?.Id, Weight = 5 });
                    q.AssessmentOptions.Add(new AssessmentOption { OptionText = "JavaScript/Node", CareerPathId = mernPath?.Id, Weight = 5 });
                    q.AssessmentOptions.Add(new AssessmentOption { OptionText = "Python/Data", CareerPathId = dataPath?.Id, Weight = 5 });
                    q.AssessmentOptions.Add(new AssessmentOption { OptionText = "UI/UX CSS", CareerPathId = frontPath?.Id, Weight = 5 });

                    questions.Add(q);
                }
                await context.AssessmentQuestions.AddRangeAsync(questions);
                await context.SaveChangesAsync();
            }

            if (!context.RoadmapSteps.Any())
            {
                var netPath = await context.CareerPaths.FirstOrDefaultAsync(c => c.Title == ".NET Developer");
                if (netPath != null)
                {
                    var steps = new List<RoadmapStep>
                    {
                        new RoadmapStep { CareerPathId = netPath.Id, Title = "PHASE 1 — .NET Fundamentals", Description = "Learn about .NET Framework, Core, IL, CLR, and Visual Studio basics.", LearningOrder = 1, EstimatedHours = 10, TopicsJson = "[\"Introduction to .NET Framework\",\"Intermediate Language (IL)\",\"Assemblies, EXEs, DLLs\",\"CLR: JIT Compilation, Garbage Collection, Memory Management, AppDomain, CLS, CTS, Security\",\".NET Framework vs .NET Core vs Mono vs Xamarin\",\"Managed vs Unmanaged Code\",\"Visual Studio Introduction, ILDASM\"]" },
                        new RoadmapStep { CareerPathId = netPath.Id, Title = "PHASE 2 — C# Core Concepts", Description = "Console apps, Data Types, Classes, Inheritance, and Interfaces.", LearningOrder = 2, EstimatedHours = 15, TopicsJson = "[\"Console Applications & Class Libraries\",\"C# Basics, Data Types & CTS Equivalents\",\"Classes, Properties (get/set, readonly), Constructors, Destructors, Object Initializer\",\"Methods: Overloading, Optional/Named/Positional Parameters, params, Local Functions\",\"Static Members, Static Classes\",\"Inheritance: Access Specifiers, Override, Hiding, Sealed, Abstract Classes & Methods\",\"Interfaces: Implementing, Explicit, Inheritance, Default Methods\",\"Operator Overloading\",\"IDisposable, IComparable\"]" },
                        new RoadmapStep { CareerPathId = netPath.Id, Title = "PHASE 3 — Advanced C# Types", Description = "Reference/Value types, structs, enums, nullable types, and arrays.", LearningOrder = 3, EstimatedHours = 10, TopicsJson = "[\"Reference vs Value Types\",\"Structs, Enums\",\"out, ref, nullable types, nullable reference types, ??, ??=\",\"Arrays: Single, Multidimensional, Jagged, Array Class Members\",\"Indices, Ranges, Indexers\"]" },
                        new RoadmapStep { CareerPathId = netPath.Id, Title = "PHASE 4 — Generics & Collections", Description = "Generic classes/methods and collections like List, Dictionary.", LearningOrder = 4, EstimatedHours = 8, TopicsJson = "[\"Generic Classes, Methods, Constraints\",\"Collections: Generic & Non-Generic\",\"ICollection, IList, IDictionary\",\"Iterating with foreach\",\"Tuples\"]" },
                        new RoadmapStep { CareerPathId = netPath.Id, Title = "PHASE 5 — Delegates, Events & Lambdas", Description = "Understand delegates, anonymous methods, lambdas, and events.", LearningOrder = 5, EstimatedHours = 10, TopicsJson = "[\"Delegates: Calling, Multicast, Action/Func/Predicate\",\"Anonymous Methods\",\"Lambdas\",\"Declaring & Raising Events, Handling Events\"]" },
                        new RoadmapStep { CareerPathId = netPath.Id, Title = "PHASE 6 — Exception Handling", Description = "Handle errors gracefully with try/catch and custom exceptions.", LearningOrder = 6, EstimatedHours = 5, TopicsJson = "[\"try, catch, finally\",\"Checked & Unchecked Statements\",\"User-Defined Exception Classes\",\"Dos & Don'ts of Exception Handling\"]" },
                        new RoadmapStep { CareerPathId = netPath.Id, Title = "PHASE 7 — LINQ & Advanced OOP", Description = "Anonymous types, Extension methods, and querying with LINQ.", LearningOrder = 7, EstimatedHours = 12, TopicsJson = "[\"Anonymous Types\",\"Extension Methods\",\"Partial Classes & Methods\",\"LINQ to Objects, Writing Queries, Deferred Execution, LINQ Methods\",\"PLINQ\"]" },
                        new RoadmapStep { CareerPathId = netPath.Id, Title = "PHASE 8 — Reflection, Attributes & File I/O", Description = "Custom attributes, dynamic assembly loading, and streams.", LearningOrder = 8, EstimatedHours = 8, TopicsJson = "[\"Creating Shared Assemblies\",\"Custom Attributes\",\"Reflection: Exploring & Loading Assemblies Dynamically\",\"File I/O & Streams: Directories, Files, Reading & Writing\"]" },
                        new RoadmapStep { CareerPathId = netPath.Id, Title = "PHASE 9 — Threading & Async", Description = "Multi-threading, ThreadPool, and Task Parallel Library (TPL).", LearningOrder = 9, EstimatedHours = 15, TopicsJson = "[\"Threading: ThreadStart, ThreadPool, lock, Monitor, Interlocked\",\"Tasks: async/await, Return Values\",\"Task Parallel Library (TPL)\"]" },
                        new RoadmapStep { CareerPathId = netPath.Id, Title = "PHASE 10 — ASP.NET Core MVC", Description = "Web architecture, Controllers, Razor views, validation, and routing.", LearningOrder = 10, EstimatedHours = 20, TopicsJson = "[\"MVC Architecture & Folder Structure\",\"Controllers & Actions: HttpGet, HttpPost, NoAction\",\"Models, ViewModels, Razor Views, HTML Helpers\",\"ViewBag, TempData, Session, Cookies, QueryString\",\"Validation: Data Annotations, Client-Side & Server-Side\",\"Strongly Typed Views, Scaffold Templates, CRUD\",\"Partial Views, Action Methods\",\"Routing: Routing Engine, Attribute Routing, Request Lifecycle\",\"Layouts, Bundling & Minification\",\"Filters & Custom Action Filters\",\"Error Handling with Log Entry\"]" },
                        new RoadmapStep { CareerPathId = netPath.Id, Title = "PHASE 11 — Data Access", Description = "ADO.NET, EF Core code first, and Fluent API.", LearningOrder = 11, EstimatedHours = 15, TopicsJson = "[\"ADO.NET: SqlClient, Connection, Command, DataReader, DataAdapter, DataSet, DataTable\",\"Async Command Execution & Connections\",\"Entity Framework Core: Code First, Data Annotations, Fluent API, Migrations, CRUD\",\"Razor Pages Introduction\"]" },
                        new RoadmapStep { CareerPathId = netPath.Id, Title = "PHASE 12 — Security", Description = "Authentication, AntiForgery, and XSS prevention.", LearningOrder = 12, EstimatedHours = 8, TopicsJson = "[\"Authorize & AllowAnonymous Attributes\",\"Forms-Based Authentication\",\"AntiForgeryToken (CSRF Protection)\",\"Cross-Site Scripting (XSS) Prevention\"]" },
                        new RoadmapStep { CareerPathId = netPath.Id, Title = "PHASE 13 — Web APIs & React Integration", Description = "Create REST APIs and consume them in a React frontend.", LearningOrder = 13, EstimatedHours = 20, TopicsJson = "[\"Creating ASP.NET Core Web API\",\"CORS Configuration\",\"HTTP Verbs, Newtonsoft APIs\",\"Consuming API from a Client\",\"Integrating Web API with React\",\"MVC + React: Models, Controllers, Views, State Management, Routing, Auth\",\"Localization (Demo)\",\"Deployment (Demo)\"]" }
                    };
                    await context.RoadmapSteps.AddRangeAsync(steps);
                    await context.SaveChangesAsync();
                }
            }

            if (!context.Projects.Any())
            {
                var netPath = await context.CareerPaths.FirstOrDefaultAsync(c => c.Title == ".NET Developer");
                if (netPath != null)
                {
                    context.Projects.AddRange(
                        new Project { Title = "Hospital Management", Description = "Manage patients", Difficulty = SkillDifficulty.Intermediate, CareerPathId = netPath.Id, GitHubTemplate = "url", EstimatedDuration = 20 },
                        new Project { Title = "Inventory System", Description = "Manage stock", Difficulty = SkillDifficulty.Beginner, CareerPathId = netPath.Id, GitHubTemplate = "url", EstimatedDuration = 15 }
                    );
                    await context.SaveChangesAsync();
                }
            }

            if (!context.Users.Any())
            {
                var user = new User
                {
                    FullName = "Akash Student",
                    Email = "akash@test.com",
                    PasswordHash = PasswordHelper.HashPassword("Password123!")
                };
                await context.Users.AddAsync(user);
                await context.SaveChangesAsync();

                var profile = new StudentProfile
                {
                    UserId = user.Id,
                    CollegeName = "Engineering College",
                    Degree = "B.Tech",
                    Branch = "Computer Science",
                    AcademicYear = 3,
                    CGPA = 8.5m,
                    PreferredLocation = "Remote"
                };
                await context.StudentProfiles.AddAsync(profile);

                var netPath = await context.CareerPaths.FirstOrDefaultAsync(c => c.Title == ".NET Developer");
                if (netPath != null)
                {
                    var rec = new CareerRecommendation
                    {
                        UserId = user.Id,
                        CareerPathId = netPath.Id,
                        MatchPercentage = 95,
                        RecommendationReason = "Strong logic skills"
                    };
                    await context.CareerRecommendations.AddAsync(rec);

                    var roadmap = new Roadmap
                    {
                        UserId = user.Id,
                        CareerPathId = netPath.Id
                    };
                    await context.Roadmaps.AddAsync(roadmap);
                    
                    await context.SaveChangesAsync();

                    var steps = await context.RoadmapSteps.Where(s => s.CareerPathId == netPath.Id).ToListAsync();
                    foreach (var step in steps)
                    {
                        await context.UserRoadmapProgresses.AddAsync(new UserRoadmapProgress
                        {
                            UserId = user.Id,
                            RoadmapStepId = step.Id,
                            Status = RoadmapStatus.NotStarted
                        });
                    }
                }

                var readiness = new PlacementReadiness
                {
                    UserId = user.Id,
                    RoadmapScore = 50,
                    SkillScore = 40,
                    ProjectScore = 60,
                    AssessmentScore = 80,
                    OverallScore = 55
                };
                await context.PlacementReadinesses.AddAsync(readiness);

                await context.SaveChangesAsync();
            }
        }
    }
}