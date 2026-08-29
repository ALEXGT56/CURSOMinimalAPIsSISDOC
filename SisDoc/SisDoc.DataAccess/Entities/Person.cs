using System;
using System.Collections.Generic;
using System.Text;

namespace SisDoc.DataAccess.Entities
{
    public class Person : BaseEntity    
    {
        public string Name { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public User? User { get; set; }
        public int UserId { get; set; }
    }
}
