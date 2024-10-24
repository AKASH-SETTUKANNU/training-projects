
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using taskTracker.models;
using taskTracker.services;

namespace taskTracker.Controllers
{
    [Route("api/[controller]")]
    [ApiController]


    public class ActivityController : ControllerBase
    {

        private readonly ActivityService _activityService;
        private readonly ILogger<ActivityController> _logger;

        public ActivityController(ActivityService activityService, ILogger<ActivityController> logger)
        {
            _activityService = activityService;
            _logger = logger;
        }

        [HttpPost]
        public async Task<ActionResult<ActivityData>> CreateActivity(ActivityData data)
        {
            if (data == null)
            {
                return BadRequest("Task data is required.");
            }

            try
            {
                var createActivity = await _activityService.Create(data);
                return Created(string.Empty, createActivity);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while creating the task.");
                return StatusCode(500, $"Internal server error: {ex.Message}");

            }
        }

        [HttpGet]
        public async Task<ActionResult<ActivityData>> GetActivity(int activityId)
        {
            try
            {
              var activity= await _activityService.GetByID(activityId);
                if (activity == null)
                {
                    return NotFound();
                }
                return activity;
            }
            catch (Exception ex)
            {

                _logger.LogError(ex, "Error while retrieving the get Task.");
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpPut]

        public async  Task<ActionResult<ActivityData>> updateActivity(ActivityData activityDate)
        {
            try
            {
                if (activityDate == null)
                    return BadRequest("Task data is required.");

                try
                {
                    var updatedTask = await _activityService.Update(activityDate);
                    return Ok(updatedTask);
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Error while updating the task.");
                    return StatusCode(500, $"Internal server error: {ex.Message}");
                }
            }
            catch(Exception ex) 
            {
                _logger.LogError(ex, "Error while updating the task");
                throw new Exception("An error occured while updating the task.", ex);

            }
        }

    }
}
