using SisDoc.Business.DTO.Request.DocumentTicket;
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

            return group;
        }
    }
}
