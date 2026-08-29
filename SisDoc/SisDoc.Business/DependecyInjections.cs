using Microsoft.Extensions.DependencyInjection;
using SisDoc.Business.Implementations;
using SisDoc.Business.Interfaces;


namespace SisDoc.Business
{
    public static class DependecyInjections
    {
        public static IServiceCollection AddBusiness(this IServiceCollection services)
        {
            services.AddScoped<ITokenService, TokenService>();
            services.AddScoped<IAuthService, AuthService>();
            services.AddScoped<IPersonService, PersonService>();
            return services;
        }
    }
}
