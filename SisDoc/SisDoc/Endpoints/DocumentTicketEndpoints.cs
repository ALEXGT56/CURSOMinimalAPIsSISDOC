using SisDoc.Business.DTO.Request.DocumentTicket;
using SisDoc.Business.DTO.Response.DocumentTicket;
using SisDoc.Business.DTO.Response.GlobalStatus;
using SisDoc.Business.Interfaces;
using SisDoc.Common.Helpers;

namespace SisDoc.API.Endpoints
{
    public static class DocumentTicketEndpoints
    {
        public static RouteGroupBuilder MapDocumentTicketEndpoints(this RouteGroupBuilder group)
        {
            group.MapPost("/", async (CreateDocumentTicketRequest request, IDocumentTicketService service) =>
            {
                var result = await service.CreateAsync(request);
                if (result.IsFailure)
                    return Results.BadRequest(result);

                return Results.Created("/api/documentticket/", result);
            })
            .WithName("CreateDocumentTicket")
            .WithSummary("Crea un expediente con suy detalle")
            .RequireAuthorization()
            .Produces<Result>(StatusCodes.Status201Created)
            .Produces(StatusCodes.Status400BadRequest);

            group.MapGet("/", async (IDocumentTicketService service, int pageNumber = 1, int pageSize = 100) =>
            {
                var result = await service.ListAsync(pageNumber, pageSize);
                return Results.Ok(result);
            })
            .WithName("ListDocumentTicket")
            .WithSummary("Listado de DocumentTicket")
            //.RequireAuthorization()
            .Produces<List<ListDocumentTicketResponse>>(StatusCodes.Status200OK);


            return group;
        }
    }
}
