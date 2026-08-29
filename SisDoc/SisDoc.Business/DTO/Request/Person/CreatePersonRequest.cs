using System;
using System.Collections.Generic;
using System.Text;

namespace SisDoc.Business.DTO.Request.Person
{
    public class CreatePersonRequest
    {
        public string Name { get; set; } = default!;
        public string LastName { get; set; } = default!;
        public string Email { get; set; } = default!;
        public string Phone { get; set; } = default!;
        public string UserName { get; set; } = default!;
        public string Password { get; set; } = default!;
    }
}
