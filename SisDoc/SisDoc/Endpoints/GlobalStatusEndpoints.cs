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
            group.MapGet("/", async (IGlobalStatusService service, int pageNumber = 1, int pageSize = 100) =>
            {
                var result = await service.ListAsync(pageNumber, pageSize);
                return Results.Ok(result);
            })
            .WithName("ListGlobalStatus")
            .WithSummary("Listado de GlobalStatus")
            //.RequireAuthorization()
            .Produces<List<ListGlobalStatusResponse>>(StatusCodes.Status200OK);

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
            .WithSummary("Detalle de un GlobalStatus")
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
