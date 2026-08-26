using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace SisDoc.DataAccess
{
    public class SisDocDbContext(DbContextOptions<SisDocDbContext> options) : DbContext(options)
    {

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfigurationsFromAssembly(typeof(SisDocDbContext).Assembly);
        }
    }
}
