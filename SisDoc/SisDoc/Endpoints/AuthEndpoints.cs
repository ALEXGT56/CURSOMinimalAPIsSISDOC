using SisDoc.Business.DTO.Request.Auth;
using SisDoc.Business.DTO.Response.Auth;
using SisDoc.Business.Interfaces;

namespace SisDoc.API.Endpoints
{
    public static class AuthEndpoints
    {
        public static RouteGroupBuilder MapAuthEndpoints(this RouteGroupBuilder group)
        {
            group.MapPost("/login", async (LoginRequest request, IAuthService service) =>
            {
                var result = await service.LoginAsync(request);

                if (result.IsFailure)
                    return Results.BadRequest(result);

                return Results.Ok(result);
            })
            .WithName("Login")
            .WithSummary("Autentica y devuelve el JWT (HS250, 60min)")
            .Produces<LoginResponse>(StatusCodes.Status200OK)
            .Produces(StatusCodes.Status401Unauthorized);
            return group;
        }
    }
}
