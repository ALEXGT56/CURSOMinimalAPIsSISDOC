using SisDoc.Common.Helpers;
using SisDoc.DataAccess;
using SisDoc.DataAccess.Entities;
using SisDoc.Repositories.Interfaces;
using System;

namespace SisDoc.Repositories.Implementations
{
    public class DocumentTicketRepository(SisDocDbContext context) : BaseRepository<DocumentTicket>(context), IDocumentTicketRepository
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
    }
}

