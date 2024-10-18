using EventManagement_pro.models;
using EventManagement_pro.Repositories;

namespace EventManagement_pro.Services
{
    public class AgendaService
    {
        private readonly IAgendaRepository _agendaRepository;

        public AgendaService(IAgendaRepository agendaRepository)
        {
            _agendaRepository = agendaRepository;
        }

        public async Task<AgendaData> CreateAgenda(AgendaData agendaData)
        {
           return await  _agendaRepository.Create(agendaData);
        }

        public async Task<AgendaData> UpdateGuest(AgendaData agendaData)
        {
            return await _agendaRepository.Update(agendaData);
        }

        public async Task<AgendaData> GetGuest(int id)
        {
            return await _agendaRepository.GetById(id);
        }

        public async Task<bool> DeleteGuest(int id)
        {
            return await _agendaRepository.Delete(id);
        }
    }
}
