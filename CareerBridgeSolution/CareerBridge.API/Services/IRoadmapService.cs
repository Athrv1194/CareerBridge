using System.Threading.Tasks;

namespace CareerBridge.API.Services
{
    // PLACEHOLDER: Interface defined to support isolated development for Beta's upcoming roadmap features.
    // TODO: Verify if any additional methods are needed for progress tracking.
    public interface IRoadmapService
    {
        Task<bool> UpdateStepStatusAsync(int userId, int roadmapStepId, bool isCompleted);
        Task InitializeUserRoadmapAsync(int userId, int careerPathId);
    }
}
