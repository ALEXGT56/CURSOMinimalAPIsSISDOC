using SisDoc.Common.Helpers;
using SisDoc.DataAccess;
using SisDoc.DataAccess.Entities;
using SisDoc.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;


namespace SisDoc.Repositories.Implementations
{
    public class PersonRepository(SisDocDbContext context) : BaseRepository<Person>(context), IPersonRepository
    {

        public async Task<Result> CreateWithUserAsync(Person person, User user)
        {
            using (var trx = await _context.Database.BeginTransactionAsync())
            {
                try
                {
                    var result = await _context.Set<User>().AddAsync(user);
                    await _context.SaveChangesAsync();
                    person.UserId = result.Entity.Id;

                    var customerResult = await CreateAsync(person);

                    await trx.CommitAsync();

                    return Result.Success("Persona y usuario creado exitosamente.");
                }
                catch (Exception ex)
                {
                    await trx.RollbackAsync();
                    return Result.Failure($"Error al crear cliente y usuario: {ex.Message}");
                }
            }
        }

        public async Task<bool> UserExistsAsync(string userName)
        {
            return await _context.Set<User>().AnyAsync(u => u.UserName == userName);
        }

    }
}
