using System;
using System.Collections.Generic;
using System.Text;

namespace SisDoc.Business.DTO.Response.GlobalStatus
{
    public class ListGlobalStatusResponse
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
        public string CreatedBy { get; set; } = string.Empty;
    }
}
