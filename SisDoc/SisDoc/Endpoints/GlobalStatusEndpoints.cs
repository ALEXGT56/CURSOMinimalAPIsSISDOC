using SisDoc.Business.Constants;
using SisDoc.Business.DTO.Request.GlobalStatus;
using SisDoc.Business.DTO.Response.GlobalStatus;
using SisDoc.Business.Interfaces;

namespace SisDoc.API.Endpoints
{
    public static class GlobalStatusEndpoints
    {
        public static RouteGroupBuilder MapGlobalStatusEndpoints(this RouteGroupBuilder group)
        {
            group.MapPost("/", async (AddGlobalStatusRequest request, IGlobalStatusService globalStatusService) =>
            {
                var result = await globalStatusService.CreateAsync(request);
                return Results.Ok(result);
            })
            .WithName("CreateGlobalStatus")
            .WithSummary("Crear GlobalStatus")
            //.RequireAuthorization(p => p.RequireRole(Roles.Admin))
            .Produces<AddGlobalStatusRequest>(StatusCodes.Status201Created)
            .Produces(StatusCodes.Status400BadRequest);

            group.MapGet("/{id:int}", async (int id, IGlobalStatusService globalStatusService) =>
            {
                var globalstatus = await globalStatusService.GetByIdAsync(id);
                if (globalstatus.Value == null)
                    return Results.NotFound(globalstatus);

                return Results.Ok(globalstatus);
            })
            .WithName("GetByIdGlobalStatus")
            .WithSummary("Detalle de un producto")
            .RequireAuthorization()
            .Produces<GetGlobalStatusResponse>(StatusCodes.Status200OK)
            .Produces(StatusCodes.Status404NotFound);


            group.MapPut("/{id:int}", async (int id, UpdateGlobalStatusRequest request, IGlobalStatusService globalStatusService) =>
            {
                var result = await globalStatusService.UpdateAsync(id, request);
                return Results.Ok(result);
            })
            .WithName("UpdateGlobalStatus")
            .WithSummary("Actualiza un GlobalStatus")
            //.RequireAuthorization(p => p.RequireRole(Roles.Admin))
            .Produces<AddGlobalStatusRequest>(StatusCodes.Status200OK)
            .Produces(StatusCodes.Status400BadRequest)
            .Produces(StatusCodes.Status404NotFound);

            group.MapGet("/", async (int pageNumber, int pageSize, IGlobalStatusService globalStatusService) =>
            {
                var globalstatus = await globalStatusService.ListAsync(pageNumber, pageSize);
                if (globalstatus == null)
                    return Results.NotFound();

                return Results.Ok(globalstatus);
            })
               .WithName("Get list GlobalStatus")
               .WithSummary("Listado de GlobalStatus")
               //.RequireAuthorization()
               .Produces<GetGlobalStatusResponse>(StatusCodes.Status200OK);

            group.MapDelete("/{id:int}", async (int id, IGlobalStatusService globalStatusService) =>
            {
                var result = await globalStatusService.DeleteAsync(id);
                return Results.Ok(result);
            })
            .WithName("DeleteGlobalStatus")
            .WithSummary("Elimina GlobalStatus según su ID")
            //.RequireAuthorization(p => p.RequireRole(Roles.Admin))
            .Produces<AddGlobalStatusRequest>(StatusCodes.Status200OK)
            .Produces(StatusCodes.Status400BadRequest)
            .Produces(StatusCodes.Status404NotFound);

            return group;
        }
    }
}
