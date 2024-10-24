using Microsoft.AspNetCore.Mvc.Diagnostics;
using System.Collections.Generic;
using System.Threading.Tasks;
using taskTracker.models;
namespace taskTracker.Repositories
{
  

    namespace EventManagementPro.Repositories
    {
        public interface IUserRepository
        {
            Task<UserData> Create(UserData user);
            Task<UserData> GetById(int id);
           
            Task<bool> IsUserExistsByEmail(string email);
            Task<UserData> GetByEmail(string email);
        }
    }

}
