using EventManagement_pro.models;

namespace EventManagement_pro.Repositories
{
    public interface IGuestRepository
    {
        Task<GuestData> Create(GuestData guestData);
        Task<GuestData> Update(GuestData guestData);
        Task<bool> Delete(int id);
        Task<GuestData> GetById(int id);

    }
}
