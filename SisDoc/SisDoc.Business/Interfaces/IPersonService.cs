using SisDoc.Business.DTO.Request;
using SisDoc.Business.DTO.Request.Person;
using SisDoc.Business.DTO.Response.Person;
using SisDoc.Common.Helpers;
using System;
using System.Collections.Generic;
using System.Text;

namespace SisDoc.Business.Interfaces
{
    public interface IPersonService
    {
        Task<Result> RegisterAsync(CreatePersonRequest request);
        Task<Result<List<ListPersonsResponse>>> ListAsync(int pageNumber = 1, int pageSize = 10);
        Task<Result<List<ListPersonsResponse>>> ListAsync(PagedRequest request);
        Task<Result<GetPersonResponse>> GetByIdAsync(int id);
        Task<Result> UpdateAsync(int id, UpdatePersonRequest request);
        Task<Result> DeleteAsync(int id);
    }
}
