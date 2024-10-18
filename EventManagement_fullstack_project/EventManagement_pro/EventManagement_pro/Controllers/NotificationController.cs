using EventManagementPro.Models;
using EventManagement_pro.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Threading.Tasks;
using EventManagementPro.models;

namespace EventManagement_pro.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NotificationController : ControllerBase
    {
        private readonly NotificationService _notificationService;
        private readonly ILogger<NotificationController> _logger;

        public NotificationController(NotificationService notificationService, ILogger<NotificationController> logger)
        {
            _notificationService = notificationService;
            _logger = logger;
        }

        // Create Notification
        [HttpPost]
        public async Task<IActionResult> CreateNotification([FromBody] NotificationData notificationData)
        {
            if (notificationData == null)
            {
                return BadRequest("Notification data is required.");
            }

            try
            {
                var createdNotification = await _notificationService.CreateNotification(notificationData);
                return CreatedAtAction(nameof(GetNotification), new { id = createdNotification.NotificationID }, createdNotification);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while creating the notification.");
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // Get Notification by ID
        [HttpGet("{id}")]
        public async Task<IActionResult> GetNotification(int id)
        {
            try
            {
                var notificationData = await _notificationService.GetNotification(id);
                if (notificationData == null)
                    return NotFound();

                return Ok(notificationData);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while retrieving the notification.");
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // Update Notification
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateNotification(int id, [FromBody] NotificationData notificationData)
        {
            if (id != notificationData.NotificationID)
                return BadRequest("Notification ID mismatch.");

            try
            {
                var updatedNotification = await _notificationService.UpdateNotification(notificationData);
                return Ok(updatedNotification);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while updating the notification.");
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // Delete Notification
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteNotification(int id)
        {
            try
            {
                var result = await _notificationService.DeleteNotification(id);
                if (result)
                    return NoContent();

                return NotFound();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while deleting the notification.");
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
