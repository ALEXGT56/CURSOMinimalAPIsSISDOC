using SisDoc.Business.DTO.Request.DocumentTicket;
using SisDoc.Business.DTO.Response.DocumentTicket;
using SisDoc.Common.Helpers;
using System;
using System.Collections.Generic;
using System.Text;

namespace SisDoc.Business.Interfaces
{
    public interface IDocumentTicketService
    {
        Task<Result> CreateAsync(CreateDocumentTicketRequest request);
        Task<Result<List<ListDocumentTicketResponse>>> ListAsync(int pageNumber = 1, int pageSize = 10);

    }
}
