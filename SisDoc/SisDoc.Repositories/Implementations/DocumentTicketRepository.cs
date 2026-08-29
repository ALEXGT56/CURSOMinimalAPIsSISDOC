using SisDoc.Common.Helpers;
using SisDoc.DataAccess;
using SisDoc.DataAccess.Entities;
using SisDoc.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;

namespace SisDoc.Repositories.Implementations
{
    public class DocumentTicketRepository (SisDocDbContext context) : BaseRepository<DocumentTicket>(context),IDocumentTicketRepository
    {
        public async Task<Result> AddAsync(DocumentTicket request)
        {
            using (var trx = await _context.Database.BeginTransactionAsync())
            {
                try
                {
                   

                    await CreateAsync(request);

                    await trx.CommitAsync();
                }
                catch (Exception)
                {
                    await trx.RollbackAsync();
                    throw;
                }

                return Result.Success();
            }
        }

        public Task<DocumentTicket> CreateAsync(DocumentTicket entity)
        {
            throw new NotImplementedException();
        }

        public Task DeleteAsync(int id)
        {
            throw new NotImplementedException();
        }

        public Task<DocumentTicket?> GetByIdAsync(int id)
        {
            throw new NotImplementedException();
        }

        public Task<DocumentTicket?> GetByPredicateAsync(Expression<Func<DocumentTicket, bool>> predicate)
        {
            throw new NotImplementedException();
        }

        public Task<(ICollection<TResult> Result, int TotalCount)> ListAsync<TResult>(Expression<Func<DocumentTicket, bool>> predicate, Expression<Func<DocumentTicket, TResult>> selector, int pageNumber = 1, int pageSize = 10)
        {
            throw new NotImplementedException();
        }

        public Task UpdateAsync()
        {
            throw new NotImplementedException();
        }
    }
}
