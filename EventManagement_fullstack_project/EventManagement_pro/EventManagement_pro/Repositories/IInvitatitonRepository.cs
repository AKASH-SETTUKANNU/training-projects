using EventManagementPro.models;
using EventManagementPro.Models;
using System.Threading.Tasks;

namespace EventManagement_pro.Repositories
{
    public interface IInvitationRepository
    {
        Task<InvitationData> Create(InvitationData invitationData);
        Task<InvitationData> GetById(int id);
        Task<InvitationData> Update(InvitationData invitationData);
        Task<bool> Delete(int id);
    }
}
