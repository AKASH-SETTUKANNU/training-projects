using Dapper;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using taskTracker.data;
using taskTracker.models;

namespace taskTracker.Repositories
{
    public class TaskRepository : ITaskRepository
    {

        private readonly IDataAccess _dataAccess;
        private readonly ILogger<TaskRepository> _logger;

        public TaskRepository(IDataAccess dataAccess, ILogger<TaskRepository> logger)
        {
            _dataAccess = dataAccess;
            _logger = logger;
        }

        public async Task<int> Create(TaskData task)
        {
            try
            {
                
                var parameters = new DynamicParameters();
                parameters.Add("@UserID", task.UserID);
                parameters.Add("@taskclientName", task.taskclientName);
                parameters.Add("@taskProjectName", task.taskProjectName);
                parameters.Add("@taskTitle", task.taskTitle);
                parameters.Add("@taskHours", task.taskHours);
                parameters.Add("@taskDate", task.taskDate);
                parameters.Add("@taskAssignedTo", task.taskAssignedTo);
                parameters.Add("@taskAssignedBy", task.taskAssignedBy);
                parameters.Add("@tasksupportType", task.tasksupportType);
                parameters.Add("@taskPriority", task.taskPriority);
                parameters.Add("@taskDescription", task.taskDescription);
                parameters.Add("@TaskID", dbType: DbType.Int32, direction: ParameterDirection.Output); 

                await _dataAccess.ExecuteStoredProcedureAsync("taskTracker.AddTask", parameters);

               
                int taskId = parameters.Get<int>("@TaskID");
                return taskId;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while adding the Task.");
                throw new Exception("An error occurred while creating the task.", ex);
            }
        }


        public async Task<TaskData> GetById(int id)
        {
            try
            {
                var parameters = new { TaskID = id };
                return await _dataAccess.QueryFirstOrDefaultAsync<TaskData>(
                    "SELECT * FROM taskTracker.Tasks WHERE TaskID=@TaskID");

            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while retrieving wser by ID.");
                throw new Exception("An error occured while retriving the task.", ex);
            }
        }

        public async Task<TaskData> Update(TaskData task)
        {
            try
            {
                var parameters = new
                {
                    task.UserID,
                    task.taskclientName,
                    task.taskProjectName,
                    task.taskTitle,
                    task.taskHours,
                    task.taskDate,
                    task.taskAssignedTo,
                    task.taskAssignedBy,
                    task.tasksupportType,
                    task.taskPriority,
                    task.taskDescription
                };
                await _dataAccess.ExecuteStoredProcedureAsync("taskTracker.UpdateTask", parameters);
                return task;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while updating the task");
                throw new Exception("An error occured while updating the task.", ex);
            }
        }

        public async Task<IEnumerable<TaskData>> GetTasksByDateAndUserId(int userId, DateTime date)
        {
            try
            {
                var parameters = new { UserId = userId, Date = date };
                return await _dataAccess.QueryAsync<TaskData>("taskTracker.GetTasksByDateAndUserId", parameters);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while retrieving tasks by date and user ID.");
                throw new Exception("An error occurred while retrieving tasks.", ex);
            }
        }

        public async Task<IEnumerable<ActivityData>> GetActivitiesByDateAndUserId(int userId, DateTime date)
        {
            try
            {
                var parameters = new { UserId = userId, SelectedDate = date };
                return await _dataAccess.QueryAsync<ActivityData>("taskTracker.GetActivitiesByUserIdAndDate", parameters);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while retrieving activities by date and user ID.");
                throw new Exception("An error occurred while retrieving activities.", ex);
            }
        }

    }
}
