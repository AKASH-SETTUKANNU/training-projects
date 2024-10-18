using EventManagementPro.Models;
using EventManagement_pro.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace EventManagementPro.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventsController : ControllerBase
    {
        private readonly EventService _eventService;
        private readonly ILogger<EventsController> _logger;

        public EventsController(EventService eventService, ILogger<EventsController> logger)
        {
            _eventService = eventService;
            _logger = logger;
        }

        [HttpPost]
        public async Task<IActionResult> CreateEvent([FromBody] EventData eventData)
        {
            if (eventData == null)
                return BadRequest("Event data is required.");

            try
            {

                var createdEvent = await _eventService.CreateEvent(eventData);

                return CreatedAtAction(nameof(GetEvent), new { id = createdEvent.EventID }, createdEvent);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while creating the event.");
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

   
        [HttpGet("{id}")]
        public async Task<IActionResult> GetEvent(int id)
        {
            try
            {
                var eventData = await _eventService.GetEvent(id);
                if (eventData == null)
                    return NotFound();

                return Ok(eventData);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while retrieving the event.");
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

       
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateEvent(int id, [FromBody] EventData eventData)
        {
            if (id != eventData.EventID)
                return BadRequest("Event ID mismatch.");

            try
            {
              
                var updatedEvent = await _eventService.UpdateEvent(eventData);

                if (updatedEvent == null)
                    return NotFound();

                return Ok(updatedEvent);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while updating the event.");
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEvent(int id)
        {
            try
            {
                var result = await _eventService.DeleteEvent(id);

                if (result)
                    return NoContent(); 

                return NotFound(); 
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while deleting the event.");
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
