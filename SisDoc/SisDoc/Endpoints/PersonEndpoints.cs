using SisDoc.Business.Constants;
using SisDoc.Business.DTO.Request.Person;
using SisDoc.Business.Interfaces;
using SisDoc.Common.Helpers;

namespace SisDoc.API.Endpoints
{
    public static class PersonEndpoints
    {
        public static RouteGroupBuilder MapCustomerEndpoints(this RouteGroupBuilder group)
        {

            group.MapPost("/", async (CreatePersonRequest request, IPersonService service) =>
            {
                var result = await service.RegisterAsync(request);

                if (result.IsFailure)
                    return Results.BadRequest(result);

                return Results.Created("/api/person", result);
            })
            .WithName("Register Person")
            .WithSummary("Registrar una persona nueva y su usuario")
            //.RequireAuthorization(p => p.RequireRole(Roles.Admin))
            .Produces<Result>(StatusCodes.Status201Created)
            .Produces(StatusCodes.Status400BadRequest);

            return group;
        }
    }
}
