using Mapster;
using SisDoc.Business.Constants;
using SisDoc.Business.DTO.Request.Person;
using SisDoc.Business.Interfaces;
using SisDoc.Common.Helpers;
using SisDoc.DataAccess.Entities;
using SisDoc.Repositories.Interfaces;
using SisDoc.Repositories.Implementations;


namespace SisDoc.Business.Implementations
{
    public class PersonService : IPersonService
    {
        private readonly IPersonRepository _personRepository;
        public PersonService(IPersonRepository personRepository )
        {
            _personRepository = personRepository;
        }

        public async Task<Result> RegisterAsync(CreatePersonRequest request)
        {
            //Validación de existencia de usuario
            var userNameExists = await _personRepository.UserExistsAsync(request.UserName);
            if (userNameExists)
                return Result.Failure($"El nombre de usuario {request.UserName} ya existe.");

            //Validación de existencia por email
            var userEmailExists = await _personRepository.GetByPredicateAsync(c => c.Email == request.Email);

            if (userEmailExists != null)
                return Result.Failure($"El correo electronico {request.Email} ya está siendo usado.");

            //Crear las instancias de Customer y User

            var user = new User
            {
                UserName = request.UserName,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.Password),
                Rol = Roles.Customer
            };

            var customer = request.Adapt<Person>();

            await _personRepository.CreateWithUserAsync(customer, user);

            return Result.Success("Persona registrado exitosamente.");
        }
    }
}
