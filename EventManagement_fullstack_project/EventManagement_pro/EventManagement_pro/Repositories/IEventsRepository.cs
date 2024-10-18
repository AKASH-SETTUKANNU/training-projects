using EventManagementPro.Models;

namespace EventManagement_pro.Repositories
{
    public interface IEventsRepository
    {
        Task<EventData> Create(EventData eventData);
        Task<EventData> GetById(int id);
        Task<EventData> Update(EventData eventData);
        Task<bool> Delete(int id);  
    }
}
