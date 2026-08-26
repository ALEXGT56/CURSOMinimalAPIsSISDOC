using SisDoc.Business.DTO.Response.Auth;
using SisDoc.Common.Helpers;
using SisDoc.DataAccess.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace SisDoc.Business.Interfaces
{
    public interface ITokenService
    {
        Result<TokenResponse> Generate(User request);
    }
}
