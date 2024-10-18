using EventManagementPro.Data;
using EventManagementPro.Models;

namespace EventManagementPro.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly IDataAccess _dataAccess;
        private readonly ILogger<UserRepository> _logger;

        public UserRepository(IDataAccess dataAccess, ILogger<UserRepository> logger)
        {
            _dataAccess = dataAccess;
            _logger = logger;
        }

        public async Task<UserData> Create(UserData user)
        {
            try
            {
                var parameters = new
                {
                    user.UserName,
                    user.Email,
                    user.BirthDate,
                    user.UserPassword,
                    user.UserRole
                };

                await _dataAccess.ExecuteStoredProcedureAsync("Event_Management.AddUser", parameters);
                return user;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while adding the user.");
                throw new Exception("An error occurred while creating the user.", ex);
            }
        }

        public async Task<UserData> GetById(int id)
        {
            try
            {
                var parameters = new { UserId = id };
                return await _dataAccess.QueryFirstOrDefaultAsync<UserData>("SELECT * FROM Event_Management.Users WHERE UserId = @UserId", parameters);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while retrieving user by ID.");
                throw new Exception("An error occurred while retrieving the user.", ex);
            }
        }

        public async Task<UserData> Update(UserData user)
        {
            try
            {
                var parameters = new
                {
                    user.UserId,
                    user.UserName,
                    user.Email,
                    user.BirthDate,
                    user.UserPassword,
                    user.UserRole
                };

                await _dataAccess.ExecuteStoredProcedureAsync("Event_Management.UpdateUser", parameters);
                return user;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while updating the user.");
                throw new Exception("An error occurred while updating the user.", ex);
            }
        }

        public async Task<bool> Delete(int id)
        {
            try { 
                 var parameters = new { UserId = id };
                await _dataAccess.ExecuteStoredProcedureAsync("Event_Management.DeleteUser", parameters);
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while deleting the user.");
                throw new Exception("An error occurred while deleting the user.", ex);
            }
        }
    }
}
