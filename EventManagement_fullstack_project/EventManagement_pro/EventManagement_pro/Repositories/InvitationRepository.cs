using EventManagementPro.Data;
using EventManagementPro.models;
using EventManagementPro.Models;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Logging;
using System;
using System.Threading.Tasks;

namespace EventManagement_pro.Repositories
{
    public class InvitationRepository : IInvitationRepository
    {
        private readonly IDataAccess _dataAccess;
        private readonly ILogger<InvitationRepository> _logger;

        public InvitationRepository(IDataAccess dataAccess, ILogger<InvitationRepository> logger)
        {
            _dataAccess = dataAccess;
            _logger = logger;
        }

        public async Task<InvitationData> Create(InvitationData invitationData)
        {
            try
            {
                var parameters = new
                {
                    invitationData.UserID,
                    invitationData.EventID,
                    invitationData.InvitationSent,
                    invitationData.Response
                };

                _logger.LogInformation($"Attempting to create invitation for event: {invitationData.EventID}");

                await _dataAccess.ExecuteStoredProcedureAsync("Event_Management.AddInvitation", parameters);
                _logger.LogInformation($"Invitation for event {invitationData.EventID} created successfully.");

                return invitationData;
            }
            catch (SqlException sqlEx)
            {
                _logger.LogError(sqlEx, "SQL Error while adding the invitation.");
                throw new Exception("An error occurred while creating the invitation.", sqlEx);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while adding the invitation.");
                throw new Exception("An error occurred while creating the invitation.", ex);
            }
        }

        public async Task<InvitationData> GetById(int id)
        {
            try
            {
                var parameters = new { InvitationID = id };
                return await _dataAccess.QueryFirstOrDefaultAsync<InvitationData>("SELECT * FROM Event_Management.Invitations WHERE InvitationID=@InvitationID", parameters);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while retrieving invitation by ID.");
                throw new Exception("An error occurred while retrieving the invitation.", ex);
            }
        }

        public async Task<InvitationData> Update(InvitationData invitationData)
        {
            try
            {
                var parameters = new
                {
                    invitationData.InvitationID,
                    invitationData.InvitationSent,
                    invitationData.Response
                };

                await _dataAccess.ExecuteStoredProcedureAsync("Event_Management.UpdateInvitation", parameters);
                return invitationData;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while updating the invitation.");
                throw new Exception("An error occurred while updating the invitation.", ex);
            }
        }

        public async Task<bool> Delete(int id)
        {
            try
            {
                var parameters = new { InvitationID = id };
                await _dataAccess.ExecuteStoredProcedureAsync("Event_Management.DeleteInvitation", parameters);
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while deleting the invitation.");
                throw new Exception("An error occurred while deleting the invitation.", ex);
            }
        }
    }
}
