using SisDoc.DataAccess;
using SisDoc.DataAccess.Entities;
using SisDoc.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;


namespace SisDoc.Repositories.Implementations
{
    public class BaseRepository<TEntity> : IBaseRepository<TEntity> where TEntity : BaseEntity
    {
        protected readonly SisDocDbContext _context;
        public BaseRepository(SisDocDbContext context)
        {
            _context = context;
        }

        //Metodo de creación
        public async Task<TEntity> CreateAsync(TEntity entity)
        {
            var result = await _context.Set<TEntity>().AddAsync(entity);
            await _context.SaveChangesAsync();
            return result.Entity;
        }

        //Metodo de actualización
        public async Task UpdateAsync()
        {
            await _context.SaveChangesAsync();
        }

        //Metodo de obtención por ID
        public async Task<TEntity?> GetByIdAsync(int id)
        {
            return await _context.Set<TEntity>().FirstOrDefaultAsync(p => p.Status && p.Id == id);
        }

        //Metodo de obtención por predicado
        public async Task<TEntity?> GetByPredicateAsync(Expression<Func<TEntity, bool>> predicate)
        {
            return await _context.Set<TEntity>().FirstOrDefaultAsync(predicate);
        }

        //Metodo de listado con paginación
        public async Task<(ICollection<TResult> Result, int TotalCount)> ListAsync<TResult>
        (
            Expression<Func<TEntity, bool>> predicate,
            Expression<Func<TEntity, TResult>> selector,
            int pageNumber = 1, int pageSize = 10
        )
        {
            var result = await _context.Set<TEntity>()
                .Where(predicate)
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .Select(selector)
                .ToListAsync();

            var total = await _context.Set<TEntity>()
                .Where(predicate)
                .CountAsync();

            return (result, total);
        }

        //Metodo de soft delete (actualización del estado a false)
        public async Task DeleteAsync(int id)
        {
            await _context.Set<TEntity>()
                .Where(p => p.Id == id)
                .ExecuteUpdateAsync(p =>
                 p.SetProperty(e => e.Status, false));
        }
    }
}
