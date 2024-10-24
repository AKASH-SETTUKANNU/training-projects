using taskTracker.models;
using taskTracker.Repositories;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace taskTracker.services
{
    public class TaskService
    {
        private readonly ITaskRepository _taskRepository;

        public TaskService(ITaskRepository taskRepository)
        {
            _taskRepository = taskRepository;
        }

        public async Task<int> CreateTask(TaskData task)
        {
            return await _taskRepository.Create(task);
        }

        public async Task<TaskData> GetTask(int id)
        {
            return await _taskRepository.GetById(id);
        }

        public async Task<TaskData> UpdateTask(TaskData task)
        {
            return await _taskRepository.Update(task);
        }

        public async Task<IEnumerable<TaskData>> GetTasksByDateAndUserId(int userId, DateTime date)
        {
            return await _taskRepository.GetTasksByDateAndUserId(userId, date);
        }

        public async Task<IEnumerable<ActivityData>> GetActivitiesByDateAndUserId(int userId, DateTime date)
        {
            return await _taskRepository.GetActivitiesByDateAndUserId(userId, date);
        }
    }
}
