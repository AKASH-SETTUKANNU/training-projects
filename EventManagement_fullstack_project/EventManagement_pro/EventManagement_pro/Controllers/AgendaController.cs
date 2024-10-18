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
    public class AgendaController : ControllerBase
    {
        private readonly AgendaService _agendaService;
        private readonly ILogger<AgendaController> _logger;

        public AgendaController(AgendaService agendaService, ILogger<AgendaController> logger)
        {
            _agendaService = agendaService;
            _logger = logger;
        }

        // Create Agenda
        [HttpPost]
        public async Task<IActionResult> CreateAgenda([FromBody] AgendaData agendaData)
        {
            if (agendaData == null)
            {
                return BadRequest("Agenda data is required.");
            }

            try
            {
                var createdAgenda = await _agendaService.CreateAgenda(agendaData);
                return CreatedAtAction(nameof(GetAgenda), new { id = createdAgenda.AgendaID }, createdAgenda);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while creating the agenda.");
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // Get Agenda by ID
        [HttpGet()]
        public async Task<IActionResult> GetAgenda(int id)
        {
            try
            {
                var agendaData = await _agendaService.GetGuest(id);
                if (agendaData == null)
                    return NotFound();

                return Ok(agendaData);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while retrieving the agenda.");
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // Update Agenda
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateAgenda(int id, [FromBody] AgendaData agendaData)
        {
            if (id != agendaData.AgendaID)
                return BadRequest("Agenda ID mismatch.");

            try
            {
                var updatedAgenda = await _agendaService.UpdateGuest(agendaData);
                return Ok(updatedAgenda);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while updating the agenda.");
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // Delete Agenda
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAgenda(int id)
        {
            try
            {
                var result = await _agendaService.DeleteGuest(id);
                if (result)
                    return NoContent();

                return NotFound();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while deleting the agenda.");
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
