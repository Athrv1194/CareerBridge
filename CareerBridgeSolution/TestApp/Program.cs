using System;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using CareerBridge.API.Data;
using CareerBridge.API.Repositories.Dashboard;
using CareerBridge.API.Services.Dashboard;
using System.Text.Json;

namespace TestApp
{
    class Program
    {
        static async Task Main(string[] args)
        {
            var options = new DbContextOptionsBuilder<AppDbContext>()
                .UseSqlServer("Server=(localdb)\\MSSQLLocalDB;Database=CareerBridgeDb;Trusted_Connection=True;MultipleActiveResultSets=true")
                .Options;

            using var context = new AppDbContext(options);
            var repo = new DashboardRepository(context);
            var service = new DashboardService(repo);

            try
            {
                var result = await service.GetDashboardAsync(2);
                Console.WriteLine("SUCCESS!");
                Console.WriteLine(JsonSerializer.Serialize(result));
            }
            catch (Exception ex)
            {
                Console.WriteLine("EXCEPTION: " + ex.ToString());
            }
        }
    }
}
