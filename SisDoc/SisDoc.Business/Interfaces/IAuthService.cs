using SisDoc.Business.DTO.Request.Auth;
using SisDoc.Business.DTO.Response.Auth;
using SisDoc.Common.Helpers;
using System;
using System.Collections.Generic;
using System.Text;

namespace SisDoc.Business.Interfaces
{
    public interface IAuthService
    {
        Task<Result<LoginResponse>> LoginAsync(LoginRequest request);
    }
}
