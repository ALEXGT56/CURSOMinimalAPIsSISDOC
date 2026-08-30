using Mapster;
using SisDoc.Business.DTO.Request.GlobalStatus;
using SisDoc.Business.DTO.Response.GlobalStatus;
using SisDoc.Business.Interfaces;
using SisDoc.Common.Helpers;
using SisDoc.DataAccess.Entities;
using SisDoc.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace SisDoc.Business.Implementations
{
    public class GlobalStatusService : IGlobalStatusService
    {
        private readonly IGlobalStatusRepository _repository;
        public GlobalStatusService(IGlobalStatusRepository repository)
        {
            _repository = repository;
        }
        public async Task<Result> CreateAsync(AddGlobalStatusRequest request)
        {
            var globalstatus = request.Adapt<GlobalStatus>();
            var result = await _repository.CreateAsync(globalstatus);
            return Result.Success();
        }

        public async Task<Result<GetGlobalStatusResponse>> GetByIdAsync(int id)
        {
            var result = await _repository.GetByIdAsync(id);

            if (result is null)
                return Result.Failure<GetGlobalStatusResponse>("GlobalStatus not found.");

            return Result.Success(result.Adapt<GetGlobalStatusResponse>());
        }

        public async  Task<Result> UpdateAsync(int id, UpdateGlobalStatusRequest request)
        {
            var result = await _repository.GetByIdAsync(id);

            if (result is null)
                return Result.Failure("GlobalStatus not found.");

            var globalstatus = request.Adapt(result);
            await _repository.UpdateAsync();

            return Result.Success();
        }

        public async Task<Result> DeleteAsync(int id)
        {
            var result = await _repository.GetByIdAsync(id);

            if (result is null)
                return Result.Failure("GlobalStatus not found.");

            await _repository.DeleteAsync(id);
            return Result.Success();
        }



        public async Task<Result<List<ListGlobalStatusResponse>>> ListAsync(int pageNumber = 1, int pageSize = 10)
        {
            var result = await _repository.ListAsync(
                predicate: p => p.Status,
                selector: p => new ListGlobalStatusResponse
                {
                    Id = p.Id,
                    Name = p.Name,
                    Description = p.Description, 
                    CreatedAt = p.CreatedAt,
                    CreatedBy = p.CreatedBy
                },
                pageNumber: pageNumber,
                pageSize: pageSize
            );
            return Result.Success(result.Result.ToList());
        }

   
    }
}
