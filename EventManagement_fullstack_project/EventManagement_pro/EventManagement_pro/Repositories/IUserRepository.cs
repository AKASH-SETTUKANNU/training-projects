using EventManagementPro.Models;

namespace EventManagementPro.Repositories
{
    public interface IUserRepository
    {
        Task<UserData> Create(UserData user);
        Task<UserData> GetById(int id);
        Task<UserData> Update(UserData user);
        Task<bool> Delete(int id);
    }
}
