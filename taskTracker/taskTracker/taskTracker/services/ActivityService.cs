using taskTracker.models;
using taskTracker.Repositories;

namespace taskTracker.services
{
    public class ActivityService
    {
        private readonly IActivityRepository _activityRepository;

        public ActivityService(IActivityRepository activityRepository)
        {
            _activityRepository = activityRepository;
        }

        public async Task<ActivityData> Create(ActivityData activityData)
        {
            return await _activityRepository.Create(activityData);
        }

        public async Task<ActivityData> GetByID(int id)
        {
            return await _activityRepository.GetByID(id);
        }

        public async Task<ActivityData> Update(ActivityData activityData)
        {
            return await _activityRepository.Update(activityData);
        }

    }
}
