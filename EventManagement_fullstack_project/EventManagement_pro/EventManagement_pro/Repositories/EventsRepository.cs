using EventManagementPro.Data;
using EventManagementPro.Models;
using Microsoft.Data.SqlClient;

namespace EventManagement_pro.Repositories
{
    public class EventsRepository : IEventsRepository
    {
        private readonly IDataAccess _dataAccess;
        private readonly ILogger<EventsRepository> _logger;

        public EventsRepository(IDataAccess dataAccess, ILogger<EventsRepository> logger)
        {
            _dataAccess = dataAccess;
            _logger = logger;
        }

        public async Task<EventData> Create(EventData eventData)
        {
            try
            {
                var parameters = new
                {
                    eventData.EventName,
                    eventData.EventDate,
                    eventData.EventCategory,
                    eventData.EventDescription,
                    eventData.EventStatus,
                    eventData.AcceptCount,
                    eventData.RejectCount,
                    eventData.PendingCount,
                    eventData.ImageUrl,
                    eventData.UserID
                };

                _logger.LogInformation($"Attempting to create event: {eventData.EventName}");

                await _dataAccess.ExecuteStoredProcedureAsync("Event_Management.AddEvent", parameters);
                _logger.LogInformation($"Event {eventData.EventName} created successfully.");

                return eventData;
            }
            catch (SqlException sqlEx)
            {
                _logger.LogError(sqlEx, "SQL Error while adding the event.");
                throw new Exception("An error occurred while creating the event.", sqlEx);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while adding the event.");
                throw new Exception("An error occurred while creating the event.", ex);
            }
        }


        public async Task<EventData> GetById(int id)
        {
            try
            {
                var parameters = new { EventId = id };
                return await _dataAccess.QueryFirstOrDefaultAsync<EventData>("SELECT * FROM Event_Management.Events WHERE EventID=@EventId", parameters);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while retrieving event by ID.");
                throw new Exception("An error occurred while retrieving the event.", ex);
            }
        }

        public async Task<EventData> Update(EventData eventData)
        {
            try
            {
                var parameters = new
                {
                    eventData.EventID,
                    eventData.EventName,
                    eventData.EventDate,
                    eventData.EventDescription,
                    eventData.EventStatus,
                    eventData.EventCategory,
                    eventData.UserID
                    
                  
                };

                await _dataAccess.ExecuteStoredProcedureAsync("Event_Management.UpdateEvent", parameters);
                return eventData;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while updating the event.");
                throw new Exception("An error occurred while updating the event.", ex);
            }
        }

        public async Task<bool> Delete(int id)
        {
            try
            {
                var parameters = new { EventID = id };
                await _dataAccess.ExecuteStoredProcedureAsync("Event_Management.DeleteEvent", parameters);
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while deleting the event.");
                throw new Exception("An error occurred while deleting the event.", ex);
            }
        }
    }
}
