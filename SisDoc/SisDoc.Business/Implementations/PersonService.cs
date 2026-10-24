using Mapster;
using SisDoc.Business.Constants;
using SisDoc.Business.DTO.Request;
using SisDoc.Business.DTO.Request.Person;
using SisDoc.Business.DTO.Response.GlobalStatus;
using SisDoc.Business.DTO.Response.Person;
using SisDoc.Business.Interfaces;
using SisDoc.Common.Helpers;
using SisDoc.DataAccess.Entities;
using SisDoc.Repositories.Implementations;
using SisDoc.Repositories.Interfaces;


namespace SisDoc.Business.Implementations
{
    public class PersonService : IPersonService
    {
        private readonly IPersonRepository _personRepository;
        public PersonService(IPersonRepository personRepository )
        {
            _personRepository = personRepository;
        }

        public async Task<Result<List<ListPersonsResponse>>> ListAsync(PagedRequest request)
        {
            var result = await _personRepository.ListAsync(
                     predicate: c => c.Status &&
                         (
                             string.IsNullOrEmpty(request.Search) ||
                             c.Name.Contains(request.Search) ||
                             c.LastName.Contains(request.Search) ||
                             c.Email.Contains(request.Search) ||
                             c.Phone.Contains(request.Search)
                         ),
                     selector: c => new ListPersonsResponse
                     {
                         Id = c.Id,
                         Name = c.Name,
                         LastName = c.LastName,
                         Email = c.Email,
                         Phone = c.Phone,
                         CreatedAt = c.CreatedAt,
                         CreatedBy = c.CreatedBy
                     },
                     pageNumber: request.PageNumber,
                     pageSize: request.PageSize
                 );
            return Result.Success(result.Result.ToList());
        }


        public async Task<Result<List<ListPersonsResponse>>> ListAsync(int pageNumber = 1, int pageSize = 10)
        {
            var result = await _personRepository.ListAsync(
                predicate: p => p.Status,
                selector: p => new ListPersonsResponse
                {
                    Id = p.Id,
                    Name = p.Name,
                    LastName = p.LastName,
                    Email = p.Email,
                    Phone = p.Phone,
                    CreatedAt = p.CreatedAt,
                    CreatedBy = p.CreatedBy
                },
                pageNumber: pageNumber,
                pageSize: pageSize
            );
            return Result.Success(result.Result.ToList());
        }



        public async Task<Result<GetPersonResponse>> GetByIdAsync(int id)
        {
            var customer = await _personRepository.GetByIdAsync(id);
            if (customer is null)
                return Result.Failure<GetPersonResponse>("Persona no encontrada.");
            return Result.Success(customer.Adapt<GetPersonResponse>());
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

        public async Task<Result> UpdateAsync(int id, UpdatePersonRequest request)
        {
            var customer = await _personRepository.GetByIdAsync(id);
            if (customer is null)
                return Result.Failure("Persona no encontrada.");
            request.Adapt(customer);
            await _personRepository.UpdateAsync();
            return Result.Success();
        }

        public async Task<Result> DeleteAsync(int id)
        {
            var result = await _personRepository.GetByIdAsync(id);

            if (result is null)
                return Result.Failure("Product not found.");

            await _personRepository.DeleteAsync(id);
            return Result.Success();
        }
    }
}
