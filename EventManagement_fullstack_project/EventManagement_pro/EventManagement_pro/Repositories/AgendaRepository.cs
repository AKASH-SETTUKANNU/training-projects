using EventManagementPro.Models;
using EventManagementPro.Data;
using Microsoft.Extensions.Logging;
using System;
using System.Threading.Tasks;
using EventManagement_pro.models;

namespace EventManagement_pro.Repositories
{
    public class AgendaRepository : IAgendaRepository
    {
        private readonly IDataAccess _dataAccess;
        private readonly ILogger<AgendaRepository> _logger;

        public AgendaRepository(IDataAccess dataAccess, ILogger<AgendaRepository> logger)
        {
            _dataAccess = dataAccess;
            _logger = logger;
        }

        // Create Agenda
        public async Task<AgendaData> Create(AgendaData agendaData)
        {
            try
            {
                var parameters = new
                {
                    agendaData.EventID,
                    agendaData.AgendaLocation,
                    agendaData.AgendaDate,
                    agendaData.AgendaStartTime,
                    agendaData.AgendaEndTime,
                    agendaData.AgendaDescription
                };

                await _dataAccess.ExecuteStoredProcedureAsync("Event_Management.AddAgenda", parameters);
                return agendaData;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while adding the agenda.");
                throw new Exception("An error occurred while creating the agenda.", ex);
            }
        }

        // Get Agenda by ID
        public async Task<AgendaData> GetById(int id)
        {
            try
            {
                var parameters = new { AgendaID = id };
                return await _dataAccess.QueryFirstOrDefaultAsync<AgendaData>(
                    "SELECT * FROM Event_Management.Agendas WHERE AgendaID = @AgendaID", parameters);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while retrieving agenda by ID.");
                throw new Exception("An error occurred while retrieving the agenda.", ex);
            }
        }

        // Update Agenda
        public async Task<AgendaData> Update(AgendaData agendaData)
        {
            try
            {
                var parameters = new
                {
                    agendaData.AgendaID,
                    agendaData.EventID,
                    agendaData.AgendaLocation,
                    agendaData.AgendaDate,
                    agendaData.AgendaStartTime,
                    agendaData.AgendaEndTime,
                    agendaData.AgendaDescription
                };

                await _dataAccess.ExecuteStoredProcedureAsync("Event_Management.UpdateAgenda", parameters);
                return agendaData;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while updating the agenda.");
                throw new Exception("An error occurred while updating the agenda.", ex);
            }
        }

        // Delete Agenda
        public async Task<bool> Delete(int id)
        {
            try
            {
                var parameters = new { AgendaID = id };
                await _dataAccess.ExecuteStoredProcedureAsync("Event_Management.DeleteAgenda", parameters);
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while deleting the agenda.");
                throw new Exception("An error occurred while deleting the agenda.", ex);
            }
        }
    }
}
