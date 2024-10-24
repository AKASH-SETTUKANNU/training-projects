namespace taskTracker.data
{
    public interface IDataAccess
    {
        Task ExecuteStoredProcedureAsync(string storedProcedure, object parameters);

        Task<T> QueryFirstOrDefaultAsync<T>(string sql, object parameters = null);
        Task<IEnumerable<T>> QueryAsync<T>(string sql, object parameters = null);
    }
}
