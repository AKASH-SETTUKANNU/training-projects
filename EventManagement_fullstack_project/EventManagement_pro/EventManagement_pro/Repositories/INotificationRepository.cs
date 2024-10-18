using EventManagementPro.models;
using System.Threading.Tasks;

namespace EventManagement_pro.Repositories
{
    public interface INotificationRepository
    {
        Task<NotificationData> Create(NotificationData notificationData);
        Task<NotificationData> GetById(int id);
        Task<NotificationData> Update(NotificationData notificationData);
        Task<bool> Delete(int id);
    }
}
