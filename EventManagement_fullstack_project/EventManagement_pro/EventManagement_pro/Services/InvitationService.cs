using EventManagement_pro.Repositories;
using EventManagementPro.models;
using EventManagementPro.Models;
using System.Threading.Tasks;

namespace EventManagement_pro.Services
{
    public class InvitationService
    {
        private readonly IInvitationRepository _invitationRepository;

        public InvitationService(IInvitationRepository invitationRepository)
        {
            _invitationRepository = invitationRepository;
        }

        public async Task<InvitationData> CreateInvitation(InvitationData invitationData)
        {
            return await _invitationRepository.Create(invitationData);
        }

        public async Task<InvitationData> UpdateInvitation(InvitationData invitationData)
        {
            return await _invitationRepository.Update(invitationData);
        }

        public async Task<bool> DeleteInvitation(int id)
        {
            return await _invitationRepository.Delete(id);
        }

        public async Task<InvitationData> GetInvitation(int id)
        {
            return await _invitationRepository.GetById(id);
        }
    }
}
