using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using SisDoc.API.Endpoints;
using SisDoc.API.Middleware;
using SisDoc.Business;
using SisDoc.DataAccess;
using SisDoc.Repositories;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

builder.Services.AddDbContext<SisDocDbContext>(p =>
{
    p.UseSqlServer(builder.Configuration.GetConnectionString("DbSisDoc"));
});

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(builder.Configuration["Jwt:SecretKey"]!))
        };
    });

builder.Services.AddAuthorization();

builder.Services
    .AddBusiness()
    .AddRepositories();

var app = builder.Build();

app.UseMiddleware<ExceptionHandlingMiddleware>();

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapGroup("/api/auth").MapAuthEndpoints().WithTags("Auth");


app.Run();
