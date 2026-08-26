using System;
using System.Collections.Generic;
using System.Text;

namespace SisDoc.DataAccess.Entities
{
    public class User : BaseEntity
    {
        public string UserName { get; set; } = string.Empty;
        public string PasswordHash { get; set; } = string.Empty;
        public string Rol { get; set; } = string.Empty;
    }
}
