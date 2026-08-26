using SisDoc.DataAccess;
using SisDoc.DataAccess.Entities;
using SisDoc.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace SisDoc.Repositories.Implementations
{
    public class UserRepository(SisDocDbContext context) : BaseRepository<User>(context), IUserRepository
    {
    }
}
