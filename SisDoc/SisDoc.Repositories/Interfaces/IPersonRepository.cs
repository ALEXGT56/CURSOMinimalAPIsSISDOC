using SisDoc.Common.Helpers;
using SisDoc.DataAccess.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace SisDoc.Repositories.Interfaces
{
    public interface IPersonRepository : IBaseRepository<Person>
    {
        Task<Result> CreateWithUserAsync(Person person, User user);
        Task<bool> UserExistsAsync(string userName);
    }
}
