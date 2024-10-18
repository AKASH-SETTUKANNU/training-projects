using EventManagement_pro.Repositories;
using EventManagementPro.Models;

namespace EventManagement_pro.Services
{
    public class EventService
    {
        private readonly IEventsRepository _eventsRepository;

        public EventService(IEventsRepository eventsRepository)
        {
            _eventsRepository = eventsRepository;
        }

        public async Task<EventData> CreateEvent(EventData eventData)
        {
            return await _eventsRepository.Create(eventData);
        }

        public async Task<EventData> UpdateEvent(EventData eventData)
        {
            return await _eventsRepository.Update(eventData);
        }


        public async Task<bool> DeleteEvent(int id)
        {
           return await _eventsRepository.Delete(id);
        }

        public async Task<EventData> GetEvent(int id)
        {
            return await _eventsRepository.GetById(id);

        }

        
    }
}
