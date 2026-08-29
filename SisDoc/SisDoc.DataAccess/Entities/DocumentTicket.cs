using System;
using System.Collections.Generic;
using System.Text;

namespace SisDoc.DataAccess.Entities
{
    public class DocumentTicket : BaseEntity
    {
        public int TicketId { get; set; }
        public string TrackingNumber { get; set; } // e.g., "DOC-2026-00045"
        public string Subject { get; set; }
        public DateTime FilingDate { get; set; }
        public string SenderName { get; set; }
        public string SenderIdNumber { get; set; } // Tax ID / SSN / Passport
        public string GlobalStatus { get; set; } // In Progress, Approved, Rejected, Completed

        // Header -> Detail Relationship (One-to-Many)
        public List<DocumentMovement> MovementHistory { get; set; } = new();

        public DocumentTicket()
        {
            MovementHistory = new List<DocumentMovement>();
            FilingDate = DateTime.Now;
            GlobalStatus = "In Progress";
        }
    }
}
