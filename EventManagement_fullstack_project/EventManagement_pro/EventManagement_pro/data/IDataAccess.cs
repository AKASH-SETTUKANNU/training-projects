using System.Threading.Tasks;

namespace EventManagementPro.Data
{
    public interface IDataAccess
    {
        Task ExecuteStoredProcedureAsync(string storedProcedure, object parameters);
        Task<T> QueryFirstOrDefaultAsync<T>(string sql, object parameters = null);
    }
}
