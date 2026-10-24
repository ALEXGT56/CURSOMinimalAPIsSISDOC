using System;
using System.Collections.Generic;
using System.Text;

namespace SisDoc.Business.DTO.Response.DocumentTicket
{
    public class ListDocumentTicketResponse
    {
        public int TicketId { get; set; }
        public string TrackingNumber { get; set; } = string.Empty; // e.g., "DOC-2026-00045"
        public string Subject { get; set; } = string.Empty;
        public DateTime FilingDate { get; set; } 
        public string SenderName { get; set; } = string.Empty;
        public string SenderIdNumber { get; set; } = string.Empty;// Tax ID / SSN / Passport
        public string GlobalStatus { get; set; } = string.Empty; // In Progress, Approved, Rejected, Completed
    }
}
