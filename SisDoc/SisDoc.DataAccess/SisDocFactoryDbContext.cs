using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.EntityFrameworkCore.Internal;

namespace SisDoc.DataAccess
{
    public class SisDocFactoryDbContext : IDesignTimeDbContextFactory<SisDocDbContext>
    {
        public SisDocDbContext CreateDbContext(string[] args)
        {
            var optionsBuilder = new DbContextOptionsBuilder<SisDocDbContext>();
            optionsBuilder.UseSqlServer("server=localhost, 1501; database=dbsisdoc; uid=sa; password=Password2026; encrypt=False;");
            return new SisDocDbContext(optionsBuilder.Options);
        }
    }
}
