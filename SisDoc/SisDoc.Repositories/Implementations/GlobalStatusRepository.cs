using Microsoft.EntityFrameworkCore;
using SisDoc.DataAccess;
using SisDoc.DataAccess.Entities;
using SisDoc.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;

namespace SisDoc.Repositories.Implementations
{
    public class GlobalStatusRepository(SisDocDbContext context) : BaseRepository<GlobalStatus>(context), IGlobalStatusRepository
    {

        public async Task<List<GlobalStatus>> GetByListIds(List<int> GlobalStatusIds)
        {
            return await _context.Set<GlobalStatus>().
                Where(p => p.Id == GlobalStatusIds.Where(x => x == p.Id).First() && p.Status)
                .ToListAsync();
        }

    }
}
