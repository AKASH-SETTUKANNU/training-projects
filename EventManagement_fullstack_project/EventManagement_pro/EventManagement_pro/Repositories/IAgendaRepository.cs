using EventManagement_pro.models;

namespace EventManagement_pro.Repositories
{
    public interface IAgendaRepository
    {
        Task<AgendaData> Create(AgendaData agendaData);
        Task<AgendaData> Update(AgendaData agendaData);
        Task<bool> Delete(int id);

        Task<AgendaData> GetById(int id);
    }
}
