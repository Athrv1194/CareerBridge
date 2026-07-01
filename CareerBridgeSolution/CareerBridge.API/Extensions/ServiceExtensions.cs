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
        }
    }
}