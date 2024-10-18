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
    public class InvitationController : ControllerBase
    {
        private readonly InvitationService _invitationService;
        private readonly ILogger<InvitationController> _logger;

        public InvitationController(InvitationService invitationService, ILogger<InvitationController> logger)
        {
            _invitationService = invitationService;
            _logger = logger;
        }

        // Create Invitation
        [HttpPost]
        public async Task<IActionResult> CreateInvitation([FromBody] InvitationData invitationData)
        {
            if (invitationData == null)
            {
                return BadRequest("Invitation data is required.");
            }

            try
            {
                var createdInvitation = await _invitationService.CreateInvitation(invitationData);
                return CreatedAtAction(nameof(GetInvitation), new { id = createdInvitation.InvitationID }, createdInvitation);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while creating the invitation.");
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // Get Invitation by ID
        [HttpGet("{id}")]
        public async Task<IActionResult> GetInvitation(int id)
        {
            try
            {
                var invitationData = await _invitationService.GetInvitation(id);
                if (invitationData == null)
                    return NotFound();

                return Ok(invitationData);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while retrieving the invitation.");
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // Update Invitation
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateInvitation(int id, [FromBody] InvitationData invitationData)
        {
            if (id != invitationData.InvitationID)
                return BadRequest("Invitation ID mismatch.");

            try
            {
                var updatedInvitation = await _invitationService.UpdateInvitation(invitationData);
                return Ok(updatedInvitation);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while updating the invitation.");
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // Delete Invitation
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteInvitation(int id)
        {
            try
            {
                var result = await _invitationService.DeleteInvitation(id);
                if (result)
                    return NoContent();

                return NotFound();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while deleting the invitation.");
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
