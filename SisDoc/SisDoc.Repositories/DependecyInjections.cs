using Microsoft.Extensions.DependencyInjection;
using SisDoc.Repositories.Implementations;
using SisDoc.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace SisDoc.Repositories
{
    public static class DependecyInjections
    {
        public static IServiceCollection AddRepositories(this IServiceCollection services)
        {

            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IPersonRepository, PersonRepository>();
            services.AddScoped<IDocumentTicketRepository, DocumentTicketRepository>();
            services.AddScoped<IGlobalStatusRepository, GlobalStatusRepository>();

            return services;
        }
    }
}
