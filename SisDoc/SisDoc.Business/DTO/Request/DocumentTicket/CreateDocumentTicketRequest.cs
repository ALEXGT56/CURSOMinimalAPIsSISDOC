using System;
using System.Collections.Generic;
using System.Text;

namespace SisDoc.Business.DTO.Request.DocumentTicket
{
    public class CreateDocumentTicketRequest
    {
        public string TrackingNumber { get; set; } // e.g., "DOC-2026-00045"
        public string Subject { get; set; }
        public DateTime FilingDate { get; set; }
        public string SenderName { get; set; }
        public string SenderIdNumber { get; set; } // Tax ID / SSN / Passport
        public string GlobalStatus { get; set; } // In Progress, Approved, Rejected, Completed
        public List<CreateDocumentDetailRequest> Details { get; set; } = new();

    }

    public class CreateDocumentDetailRequest
    {
        public int Count { get; set; }
        public int StepOrder { get; set; } // Sequence number (1, 2, 3...)
        public DateTime TransferredDate { get; set; }
        public string OriginDepartment { get; set; }
        public string TargetDepartment { get; set; }
        public string AssignedUser { get; set; }
        public string Remarks { get; set; } // Action required or notes
        public string MovementStatus { get; set; } // Pending, Received, Transferred, Resolved
        public DateTime? ReceivedDate { get; set; }

    }
}
