using SisDoc.DataAccess.Entities;


namespace SisDoc.Repositories.Interfaces
{
    public interface IGlobalStatusRepository : IBaseRepository<GlobalStatus>
    {
        Task<List<GlobalStatus>> GetByListIds(List<int> GlobalStatusIds);
    }
}
