using SisDoc.Business.DTO.Request.Auth;
using SisDoc.Business.DTO.Response.Auth;
using SisDoc.Business.Interfaces;
using SisDoc.Common.Helpers;
using SisDoc.Repositories.Interfaces;

 
namespace SisDoc.Business.Implementations
{
    public class AuthService : IAuthService
    {
        private readonly IUserRepository _userRepository;
        private readonly ITokenService _tokenService;
        public AuthService(IUserRepository userRepository, ITokenService tokenService)
        {
            _userRepository = userRepository;
            _tokenService = tokenService;
        }

        public async Task<Result<LoginResponse>> LoginAsync(LoginRequest request)
        {
            //Validación de credenciales
            var user = await _userRepository.GetByPredicateAsync(p => p.UserName == request.UserName);

            if (user is null)
                return Result.Failure<LoginResponse>("Usuario no existe");

            if (!BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash))
                return Result.Failure<LoginResponse>("Contraseña incorrecta");

            //Generación de token
            var result = _tokenService.Generate(user);

            var response = new LoginResponse
            {
                Token = result.Value!.Token,
                ExpirationDate = result.Value.ExpirationDate,
                Role = user.Rol
            };

            return Result.Success(response);
        }
    }
}
