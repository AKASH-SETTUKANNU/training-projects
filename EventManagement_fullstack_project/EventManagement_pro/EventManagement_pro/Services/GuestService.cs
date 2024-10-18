using EventManagement_pro.models;
using EventManagement_pro.Repositories;

namespace EventManagement_pro.Services
{
    public class GuestService
    {
        private readonly IGuestRepository _GuestRepository;
        public GuestService(IGuestRepository guestRepository)
        {
            _GuestRepository = guestRepository;
        }

        public async Task<GuestData> CreateGuest(GuestData guestData)
        {
            return await _GuestRepository.Create(guestData);
        }

        public async Task<GuestData> UpdateGuest(GuestData guestData)
        {
            return await _GuestRepository.Update(guestData);
        }

        public async Task<GuestData> GetGuest(int  guestId)
        {
            return await _GuestRepository.GetById(guestId);
        }

        public async Task<bool> DeleteGuest(int guestId)
        {
            return await _GuestRepository.Delete(guestId);
        }
    }
}
