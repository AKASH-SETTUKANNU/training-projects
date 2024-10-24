using taskTracker.models;

namespace taskTracker.Repositories
{
    public interface IActivityRepository
    {
        Task<ActivityData> Create(ActivityData data);
        Task<ActivityData> GetByID(int id);

        Task<ActivityData> Update(ActivityData data);
    }
}
