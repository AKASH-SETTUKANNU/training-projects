using Microsoft.AspNetCore.Mvc.Diagnostics;
using taskTracker.data;
using taskTracker.models;
using taskTracker.Repositories.EventManagementPro.Repositories;

namespace taskTracker.Repositories
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
                    user.userName,
                    user.userEmail,
                    user.userBirthDate,
                    user.userPassword
                };

                await _dataAccess.ExecuteStoredProcedureAsync("taskTracker.AddUser", parameters);
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
                return await _dataAccess.QueryFirstOrDefaultAsync<UserData>(
                    "SELECT * FROM taskTracker.Users WHERE UserId = @UserId", parameters);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while retrieving user by ID.");
                throw new Exception("An error occurred while retrieving the user.", ex);
            }
        }

       

        public async Task<bool> IsUserExistsByEmail(string email)
        {
            try
            {
                var parameters = new { Email = email };
                var result = await _dataAccess.QueryFirstOrDefaultAsync<int>(
                    "SELECT COUNT(*) FROM taskTracker.Users WHERE UserEmail = @Email",
                    parameters
                );
                return result > 0;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while checking if user exists by email.");
                throw new Exception("An error occurred while checking if the user exists by email.", ex);
            }
        }

        public async Task<UserData> GetByEmail(string email)
        {
            try
            {
                var parameters = new { Email = email };
                return await _dataAccess.QueryFirstOrDefaultAsync<UserData>(
                    "SELECT * FROM taskTracker.Users WHERE UserEmail = @Email", parameters);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while retrieving user by email.");
                throw new Exception("An error occurred while retrieving the user.", ex);
            }
        }

    }
}
