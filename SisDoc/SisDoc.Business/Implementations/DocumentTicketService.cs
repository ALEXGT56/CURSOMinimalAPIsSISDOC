using Mapster;
using SisDoc.Business.DTO.Request.DocumentTicket;
using SisDoc.Business.DTO.Response.DocumentTicket;
using SisDoc.Business.DTO.Response.GlobalStatus;
using SisDoc.Business.Interfaces;
using SisDoc.Common.Helpers;
using SisDoc.DataAccess.Entities;
using SisDoc.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace SisDoc.Business.Implementations
{
    public class DocumentTicketService : IDocumentTicketService
    {

        private readonly IDocumentTicketRepository _repository;

        public DocumentTicketService(IDocumentTicketRepository documentTicketRepository)
        {
            _repository= documentTicketRepository;
        }


        public async Task<Result> CreateAsync(CreateDocumentTicketRequest request)
        {
            //validaciones
            if (request.Details == null || request.Details.Count == 0)
                return Result.Failure("El expediente debe contener al menos una linea");

   

            var pdocumenttWithoutCount = request.Details.Any(p => p.Count <= 0);

            if (pdocumenttWithoutCount)
                return Result.Failure("El expediente no tiene  movimientos.");
 

            //Asignación de valores
            var document = request.Adapt<DocumentTicket>();
 
            var result = await _repository.AddAsync(document);

            if (result.IsFailure)
                return Result.Failure(result.Message!);

            return Result.Success();
        }

        public async Task<Result<List<ListDocumentTicketResponse>>> ListAsync(int pageNumber = 1, int pageSize = 10)
        {
            var result = await _repository.ListAsync(
                predicate: p => p.Status,
                selector: p => new ListDocumentTicketResponse
                {
                    TicketId = p.TicketId,
                    TrackingNumber = p.TrackingNumber,
                    Subject = p.Subject,
                    FilingDate = p.FilingDate,
                    SenderName = p.SenderName,
                    SenderIdNumber = p.SenderIdNumber,
                    GlobalStatus = p.GlobalStatus,
                },
                pageNumber: pageNumber,
                pageSize: pageSize
            );
            return Result.Success(result.Result.ToList());
        }



    }
}
