using Microsoft.AspNetCore.Mvc;
using taskTracker.models;
using taskTracker.services;
using Microsoft.Extensions.Logging;
using System;
using System.Threading.Tasks;

namespace taskTracker.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaskController : ControllerBase
    {
        private readonly TaskService _taskService;
        private readonly ILogger<TaskController> _logger;

        public TaskController(TaskService taskService, ILogger<TaskController> logger)
        {
            _taskService = taskService;
            _logger = logger;
        }

        [HttpGet("tasks")]
        public async Task<IActionResult> GetTasksByDateAndUserId([FromQuery] DateTime date, [FromQuery] int userId)
        { 
            var tasks = await _taskService.GetTasksByDateAndUserId(userId, date);
            return Ok(tasks);
        }

        [HttpGet("activities")]
        public async Task<IActionResult> GetActivitiesByDateAndUserId([FromQuery] DateTime date, [FromQuery] int userId)
        {
            var activities = await _taskService.GetActivitiesByDateAndUserId(userId, date);
            return Ok(activities);
        }


        [HttpPost]
        public async Task<IActionResult> CreateTask([FromBody] TaskData task)
        {
            if (task == null)
                return BadRequest("Task data is required.");

            try
            {
                var createdTask = await _taskService.CreateTask(task);
                return Created(string.Empty, createdTask);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while creating the task.");
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetTask(int id)
        {
            try
            {
                var task = await _taskService.GetTask(id);
                if (task == null)
                    return NotFound();

                return Ok(task);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while retrieving the task.");
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpPut]
        public async Task<IActionResult> UpdateTask([FromBody] TaskData task)
        {
            if (task == null)
                return BadRequest("Task data is required.");

            try
            {
                var updatedTask = await _taskService.UpdateTask(task);
                return Ok(updatedTask);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while updating the task.");
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
