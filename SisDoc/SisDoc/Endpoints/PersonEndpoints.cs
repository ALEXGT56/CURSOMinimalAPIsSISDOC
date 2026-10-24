using SisDoc.Business.Constants;
using SisDoc.Business.DTO.Request;
using SisDoc.Business.DTO.Request.Person;
using SisDoc.Business.DTO.Response.GlobalStatus;
using SisDoc.Business.DTO.Response.Person;
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


            group.MapGet("/", async (IPersonService service, int pageNumber = 1, int pageSize = 100) =>
            {
                var result = await service.ListAsync(pageNumber, pageSize);
                return Results.Ok(result);
            })
            .WithName("ListPersons")
            .WithSummary("Listado de personas")
            //.RequireAuthorization()
            .Produces<List<ListPersonsResponse>>(StatusCodes.Status200OK);

            group.MapGet("/{id:int}", async (int id, IPersonService service) =>
            {
                var result = await service.GetByIdAsync(id);
                if (result.IsFailure)
                    return Results.NotFound(result);
                return Results.Ok(result);
            })
            .WithName("GetByIdPerson")
            .WithSummary("Detalle de un persona")
            //.RequireAuthorization(p => p.RequireRole(Roles.Admin))
            .Produces<GetPersonResponse>(StatusCodes.Status200OK)
            .Produces(StatusCodes.Status404NotFound);

            group.MapPut("/{id:int}", async (int id, UpdatePersonRequest request, IPersonService service) =>
            {
                var result = await service.UpdateAsync(id, request);
                if (result.IsFailure)
                    return Results.NotFound(result);
                return Results.Ok(result);
            })
            .WithName("UpdatePerson")
            .WithSummary("Actualizar persona")
            //.RequireAuthorization(p => p.RequireRole(Roles.Admin))
            .Produces(StatusCodes.Status200OK)
            .Produces(StatusCodes.Status404NotFound);

            group.MapDelete("/{id:int}", async (int id, IPersonService service) =>
            {
                var result = await service.DeleteAsync(id);
                return Results.Ok(result);
            })
           .WithName("DeletePerson")
           .WithSummary("Elimina persona según su ID")
           //.RequireAuthorization(p => p.RequireRole(Roles.Admin))
           .Produces(StatusCodes.Status200OK)
           .Produces(StatusCodes.Status400BadRequest)
           .Produces(StatusCodes.Status404NotFound);


            return group;
        }
    }
}
