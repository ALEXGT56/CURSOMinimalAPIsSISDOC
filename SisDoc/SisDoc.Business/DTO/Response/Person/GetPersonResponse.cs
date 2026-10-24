using System;
using System.Collections.Generic;
using System.Text;

namespace SisDoc.Business.DTO.Response.Person
{
    public class GetPersonResponse
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
    }
}
