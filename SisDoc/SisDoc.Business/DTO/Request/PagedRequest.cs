using System;
using System.Collections.Generic;
using System.Text;

namespace SisDoc.Business.DTO.Request
{
    public class PagedRequest
    {
        public int PageSize { get; set; } = 10;
        public int PageNumber { get; set; } = 1;
        public string? Search { get; set; }
    }
}
