using EventManagementPro.Models;
using EventManagement_pro.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Threading.Tasks;
using EventManagement_pro.models;

namespace EventManagement_pro.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GuestController : ControllerBase
    {
        private readonly GuestService _guestService;
        private readonly ILogger<GuestController> _logger;

        public GuestController(GuestService guestService, ILogger<GuestController> logger)
        {
            _guestService = guestService;
            _logger = logger;
        }

        // Create Guest
        [HttpPost]
        public async Task<IActionResult> CreateGuest([FromBody] GuestData guestData)
        {
            if (guestData == null)
            {
                return BadRequest("Guest data is required.");
            }

            try
            {
                var createdGuest = await _guestService.CreateGuest(guestData);
                return CreatedAtAction(nameof(GetGuest), new { id = createdGuest.GuestID }, createdGuest);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while creating the guest.");
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // Get Guest by ID
        [HttpGet("{id}")]
        public async Task<IActionResult> GetGuest(int id)
        {
            try
            {
                var guestData = await _guestService.GetGuest(id);
                if (guestData == null)
                    return NotFound();

                return Ok(guestData);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while retrieving the guest.");
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // Update Guest
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateGuest(int id, [FromBody] GuestData guestData)
        {
            if (id != guestData.GuestID)
                return BadRequest("Guest ID mismatch.");

            try
            {
                var updatedGuest = await _guestService.UpdateGuest(guestData);
                return Ok(updatedGuest);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while updating the guest.");
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // Delete Guest
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteGuest(int id)
        {
            try
            {
                var result = await _guestService.DeleteGuest(id);
                if (result)
                    return NoContent();

                return NotFound();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while deleting the guest.");
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
