using taskTracker.models;
using taskTracker.Repositories.EventManagementPro.Repositories;

namespace taskTracker.services
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

        public async Task<bool> IsUserExistsByEmail(string email)
        {
            return await _userRepository.IsUserExistsByEmail(email);
        }
        public async Task<UserData> GetUserByEmail(string email)
        {
            return await _userRepository.GetByEmail(email);
        }

    }
}
