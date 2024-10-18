using EventManagementPro.Data;
using EventManagementPro.models;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Logging;
using System;
using System.Threading.Tasks;

namespace EventManagement_pro.Repositories
{
    public class NotificationRepository : INotificationRepository
    {
        private readonly IDataAccess _dataAccess;
        private readonly ILogger<NotificationRepository> _logger;

        public NotificationRepository(IDataAccess dataAccess, ILogger<NotificationRepository> logger)
        {
            _dataAccess = dataAccess;
            _logger = logger;
        }

        public async Task<NotificationData> Create(NotificationData notificationData)
        {
            try
            {
                var parameters = new
                {
                    ReciverUserID = notificationData.ReciverUserID,
                    SenderUserID = notificationData.SenderUserID,
                    SenderName = notificationData.SenderName,
                    GuestID = notificationData.GuestID,
                    EventID = notificationData.EventID,
                    AgendaID = notificationData.AgendaID,
                    RespondSent = notificationData.RespondSent
                };

                _logger.LogInformation($"Attempting to create notification for event: {notificationData.EventID}");

                await _dataAccess.ExecuteStoredProcedureAsync("Event_Management.AddNotification", parameters);
                _logger.LogInformation($"Notification for event {notificationData.EventID} created successfully.");

                return notificationData;
            }
            catch (SqlException sqlEx)
            {
                _logger.LogError(sqlEx, "SQL Error while adding the notification.");
                throw new Exception("An error occurred while creating the notification.", sqlEx);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while adding the notification.");
                throw new Exception("An error occurred while creating the notification.", ex);
            }
        }

        public async Task<NotificationData> GetById(int id)
        {
            try
            {
                var parameters = new { NotificationID = id };
                return await _dataAccess.QueryFirstOrDefaultAsync<NotificationData>(
                    "SELECT * FROM Event_Management.Notifications WHERE NotificationID=@NotificationID",
                    parameters);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while retrieving notification by ID.");
                throw new Exception("An error occurred while retrieving the notification.", ex);
            }
        }

        public async Task<NotificationData> Update(NotificationData notificationData)
        {
            try
            {
                var parameters = new
                {
                    NotificationID = notificationData.NotificationID,
                    ReciverUserID = notificationData.ReciverUserID,  
                    SenderUserID = notificationData.SenderUserID,
                    SenderName = notificationData.SenderName,
                    GuestID = notificationData.GuestID,
                    EventID = notificationData.EventID,
                    AgendaID = notificationData.AgendaID,
                    RespondSent = notificationData.RespondSent
                };

         
                _logger.LogInformation($"Updating notification with ID: {notificationData.NotificationID}, ReciverUserID: {notificationData.ReciverUserID}");

                
                await _dataAccess.ExecuteStoredProcedureAsync("Event_Management.UpdateNotification", parameters);

                return notificationData; 
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while updating the notification.");
                throw new Exception("An error occurred while updating the notification.", ex);
            }
        }

        public async Task<bool> Delete(int id)
        {
            try
            {
                var parameters = new { NotificationID = id };
                await _dataAccess.ExecuteStoredProcedureAsync("Event_Management.DeleteNotification", parameters);
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while deleting the notification.");
                throw new Exception("An error occurred while deleting the notification.", ex);
            }
        }
    }
}
