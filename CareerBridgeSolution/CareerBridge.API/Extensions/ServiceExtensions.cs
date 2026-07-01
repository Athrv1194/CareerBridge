using CareerBridge.API.Data;
using CareerBridge.API.Repositories.Auth;
using CareerBridge.API.Repositories.Profile;
using CareerBridge.API.Services.Auth;
using CareerBridge.API.Services.Profile;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace CareerBridge.API.Extensions
{
    public static class ServiceExtensions
    {
        public static void AddApplicationServices(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<AppDbContext>(options =>
                options.UseSqlServer(configuration.GetConnectionString("CareerBridgeConnection")));
            
            services.AddCors(options =>
            {
                options.AddPolicy("AllowReact", builder =>
                    builder.WithOrigins("http://localhost:5173")
                           .AllowAnyMethod()
                           .AllowAnyHeader()
                           .AllowCredentials());
            });

            services.AddAutoMapper(cfg => { cfg.AddMaps(System.AppDomain.CurrentDomain.GetAssemblies()); });

            // Auth Module DI
            services.AddScoped<IAuthRepository, AuthRepository>();
            services.AddScoped<IJwtService, JwtService>();
            services.AddScoped<IAuthService, AuthService>();
            
            // Profile Module DI
            services.AddScoped<IStudentProfileRepository, StudentProfileRepository>();
            services.AddScoped<IStudentProfileService, StudentProfileService>();

            // Assessment Module DI
            services.AddScoped<CareerBridge.API.Repositories.Assessment.IAssessmentRepository, CareerBridge.API.Repositories.Assessment.AssessmentRepository>();
            services.AddScoped<CareerBridge.API.Services.Assessment.IAssessmentService, CareerBridge.API.Services.Assessment.AssessmentService>();

            // Recommendation Module DI
            services.AddScoped<CareerBridge.API.Repositories.Recommendation.ICareerRecommendationRepository, CareerBridge.API.Repositories.Recommendation.CareerRecommendationRepository>();
            services.AddScoped<CareerBridge.API.Services.Recommendation.ICareerRecommendationService, CareerBridge.API.Services.Recommendation.CareerRecommendationService>();

            // Roadmap Module DI
            services.AddScoped<CareerBridge.API.Repositories.Roadmap.IRoadmapRepository, CareerBridge.API.Repositories.Roadmap.RoadmapRepository>();
            services.AddScoped<CareerBridge.API.Services.Roadmap.IRoadmapService, CareerBridge.API.Services.Roadmap.RoadmapService>();
        }
    }
}
