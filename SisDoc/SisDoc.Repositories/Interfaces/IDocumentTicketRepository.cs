using SisDoc.Common.Helpers;
using SisDoc.DataAccess.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace SisDoc.Repositories.Interfaces
{
    public interface IDocumentTicketRepository : IBaseRepository<DocumentTicket>
    {
        Task<Result> AddAsync(DocumentTicket request);
    }
}


 