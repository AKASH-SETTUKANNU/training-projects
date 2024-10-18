using EventManagementPro.Models;
using EventManagementPro.Data;
using Microsoft.Extensions.Logging;
using EventManagement_pro.models;

namespace EventManagement_pro.Repositories
{
    public class GuestRepository : IGuestRepository
    {
        private readonly IDataAccess _dataAccess;
        private readonly ILogger<GuestRepository> _logger;

        public GuestRepository(IDataAccess dataAccess, ILogger<GuestRepository> logger)
        {
            _dataAccess = dataAccess;
            _logger = logger;
        }

        // Create Guest
        public async Task<GuestData> Create(GuestData guestData)
        {
            try
            {
                var parameters = new
                {
                    guestData.EventID,
                    guestData.GuestName,
                    guestData.GuestEmail,
                    guestData.GuestBirthDate,
                    guestData.GuestLocation
                };

                await _dataAccess.ExecuteStoredProcedureAsync("Event_Management.AddGuest", parameters);
                return guestData;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while adding the guest.");
                throw new Exception("An error occurred while creating the guest.", ex);
            }
        }

        // Get Guest by ID
        public async Task<GuestData> GetById(int id)
        {
            try
            {
                var parameters = new { GuestID = id };
                return await _dataAccess.QueryFirstOrDefaultAsync<GuestData>(
                    "SELECT * FROM Event_Management.Guests WHERE GuestID = @GuestID", parameters);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while retrieving guest by ID.");
                throw new Exception("An error occurred while retrieving the guest.", ex);
            }
        }

        // Update Guest
        public async Task<GuestData> Update(GuestData guestData)
        {
            try
            {
                var parameters = new
                {
                    guestData.GuestID,
                    guestData.EventID,
                    guestData.GuestName,
                    guestData.GuestEmail,
                    guestData.GuestBirthDate,
                    guestData.GuestLocation
                };

                await _dataAccess.ExecuteStoredProcedureAsync("Event_Management.UpdateGuest", parameters);
                return guestData;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while updating the guest.");
                throw new Exception("An error occurred while updating the guest.", ex);
            }
        }

        // Delete Guest
        public async Task<bool> Delete(int id)
        {
            {
                try
                {
                    var parameters = new { GuestID = id };
                    await _dataAccess.ExecuteStoredProcedureAsync("Event_Management.DeleteGuest", parameters);
                    return true;
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Error while deleting the guest.");
                    throw new Exception("An error occurred while deleting the guest.", ex);
                }
            }
        }
    }
}
