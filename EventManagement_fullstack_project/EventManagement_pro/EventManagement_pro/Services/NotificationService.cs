using EventManagement_pro.Repositories;
using EventManagementPro.models;
using EventManagementPro.Models;
using System.Threading.Tasks;

namespace EventManagement_pro.Services
{
    public class NotificationService
    {
        private readonly INotificationRepository _notificationRepository;

        public NotificationService(INotificationRepository notificationRepository)
        {
            _notificationRepository = notificationRepository;
        }

        public async Task<NotificationData> CreateNotification(NotificationData notificationData)
        {
            return await _notificationRepository.Create(notificationData);
        }

        public async Task<NotificationData> UpdateNotification(NotificationData notificationData)
        {
            return await _notificationRepository.Update(notificationData);
        }

        public async Task<bool> DeleteNotification(int id)
        {
            return await _notificationRepository.Delete(id);
        }

        public async Task<NotificationData> GetNotification(int id)
        {
            return await _notificationRepository.GetById(id);
        }
    }
}
