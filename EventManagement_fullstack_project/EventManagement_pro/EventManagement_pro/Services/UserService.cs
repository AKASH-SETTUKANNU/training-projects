using EventManagementPro.Models;
using EventManagementPro.Repositories;

namespace EventManagementPro.Services
{
    public class UserService
    {
        private readonly IUserRepository _userRepository;

        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<UserData> CreateUser(UserData user)
        {
            return await _userRepository.Create(user);
        }

        public async Task<UserData> GetUser(int id)
        {
            return await _userRepository.GetById(id);
        }

        public async Task<UserData> UpdateUser(UserData user)
        {
            return await _userRepository.Update(user);
        }

        public async Task<bool> DeleteUser(int id)
        {
            return await _userRepository.Delete(id);
        }
    }
}
