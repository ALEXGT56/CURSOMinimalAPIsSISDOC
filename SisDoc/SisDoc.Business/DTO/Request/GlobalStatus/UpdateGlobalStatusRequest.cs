using System;
using System.Collections.Generic;
using System.Text;

namespace SisDoc.Business.DTO.Request.GlobalStatus
{
    public class UpdateGlobalStatusRequest
    {
        public string Name { get; set; } = default!;
        public string Description { get; set; } = default!;
    }
}
