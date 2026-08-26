using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using SisDoc.Business.DTO.Response.Auth;
using SisDoc.Business.Interfaces;
using SisDoc.Common.Helpers;
using SisDoc.DataAccess.Entities;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace SisDoc.Business.Implementations
{
    public class TokenService : ITokenService
    {
        private readonly IConfiguration _config;
        public TokenService(IConfiguration config)
        {
            _config = config;
        }

        public Result<TokenResponse> Generate(User request)
        {
            //Header
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:SecretKey"]!));
            var expiration = DateTime.UtcNow.AddMinutes(Convert.ToDouble(_config["Jwt:ExpirationMinutes"]));

            //Payload
            var claims = new[]
            {
                new Claim(ClaimTypes.Name, request.UserName),
                new Claim(ClaimTypes.Role, request.Rol),
                new Claim(ClaimTypes.NameIdentifier, request.Id.ToString()),
                new Claim(JwtRegisteredClaimNames.Sub, request.Id.ToString())
            };

            //Signature
            var token = new JwtSecurityToken(
                issuer: _config["Jwt:Issuer"],
                audience: _config["Jwt:Audience"],
                claims: claims,
                expires: expiration,
                signingCredentials: new SigningCredentials(key, SecurityAlgorithms.HmacSha256)
            );

            var tokenString = new JwtSecurityTokenHandler().WriteToken(token);
            return Result.Success<TokenResponse>(new()
            {
                Token = tokenString,
                ExpirationDate = expiration
            });
        }
    }
}
