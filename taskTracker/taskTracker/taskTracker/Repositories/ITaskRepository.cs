using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using taskTracker.models;

namespace taskTracker.Repositories
{
    public interface ITaskRepository
    {
        Task<int> Create(TaskData data);

        Task<TaskData> GetById(int id);

        Task<TaskData> Update(TaskData data);

        Task<IEnumerable<TaskData>> GetTasksByDateAndUserId(int userId, DateTime date);

        Task<IEnumerable<ActivityData>> GetActivitiesByDateAndUserId(int userId, DateTime date);
    }
}
