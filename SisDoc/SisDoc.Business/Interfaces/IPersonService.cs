using SisDoc.Business.DTO.Request.Person;
using SisDoc.Common.Helpers;
using System;
using System.Collections.Generic;
using System.Text;

namespace SisDoc.Business.Interfaces
{
    public interface IPersonService
    {
        Task<Result> RegisterAsync(CreatePersonRequest request);
    }
}
