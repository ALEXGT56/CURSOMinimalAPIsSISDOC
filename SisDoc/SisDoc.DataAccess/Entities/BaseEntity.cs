using System;
using System.Collections.Generic;
using System.Text;

namespace SisDoc.DataAccess.Entities
{
    public class BaseEntity
    {
        public int Id { get; set; }
        public bool Status { get; set; }
        public DateTime CreatedAt { get; set; }
        public string CreatedBy { get; set; } = Environment.UserName;

        public BaseEntity()
        {
            Status = true;
            CreatedAt = DateTime.UtcNow;
        }
    }
}
