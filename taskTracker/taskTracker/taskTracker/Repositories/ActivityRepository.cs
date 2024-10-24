using System.Threading.Tasks;
using taskTracker.data;
using taskTracker.models;

namespace taskTracker.Repositories
{
    public class ActivityRepository : IActivityRepository
    {
        private readonly ILogger<ActivityRepository> _logger;
        private readonly IDataAccess _dataAccess;

        public ActivityRepository(ILogger<ActivityRepository> logger, IDataAccess dataAccess)
        {
            _logger = logger;
            _dataAccess = dataAccess;
        }

        public async Task<ActivityData> Create(ActivityData data)
        {
            try
            {
                var parameters = new
                {
                    data.TaskID,
                    data.ActivityTitle,
                    data.ActivityDescription,
                    data.ActivityHour
                };

                await _dataAccess.ExecuteStoredProcedureAsync("taskTracker.AddActivity", parameters);
                return data;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while adding activity");
                throw new Exception("Error occurred during adding activity", ex);
            }
        }

        public async Task<ActivityData> GetByID(int id)
        {
            try
            {
                var parameters = new { TaskID = id };
                return await _dataAccess.QueryFirstOrDefaultAsync<ActivityData>("taskTracker.GetActivitiesByTaskID", parameters);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while retrieving activity by ID.");
                throw new Exception("An error occurred while retrieving the activity.", ex);
            }
        }

        public async Task<ActivityData> Update(ActivityData data)
        {
            try
            {
                var parameters = new
                {
                    data.TaskID,
                    data.ActivityTitle,
                    data.ActivityDescription,
                    data.ActivityHour
                };

                await _dataAccess.ExecuteStoredProcedureAsync("taskTracker.UpdateActivity", parameters);
                return data;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while updating the Activity");
                throw new Exception("An error occurred while updating the Activity.", ex);
            }
        }
    }
}
