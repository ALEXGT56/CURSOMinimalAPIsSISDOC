using SisDoc.Business.DTO.Request.GlobalStatus;
using SisDoc.Business.DTO.Response.GlobalStatus;
using SisDoc.Common.Helpers;
using System;
using System.Collections.Generic;
using System.Text;

namespace SisDoc.Business.Interfaces
{
    public interface IGlobalStatusService
    {
        Task<Result> CreateAsync(AddGlobalStatusRequest request);
        Task<Result<GetGlobalStatusResponse>> GetByIdAsync(int id);
        Task<Result> UpdateAsync(int id, UpdateGlobalStatusRequest request);
        Task<Result> DeleteAsync(int id);
        Task<Result<List<ListGlobalStatusResponse>>> ListAsync(int pageNumber = 1, int pageSize = 10);
    }
}
