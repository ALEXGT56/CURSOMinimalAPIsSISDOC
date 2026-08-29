using System;
using System.Collections.Generic;
using System.Text;

namespace SisDoc.DataAccess.Entities
{
    public class DocumentMovement : BaseEntity
    {
        public DocumentTicket? DocumentTicket { get; set; }
        public int MovementId { get; set; }
        public int TicketId { get; set; } // Foreign Key (FK)
        public int StepOrder { get; set; } // Sequence number (1, 2, 3...)
        public DateTime TransferredDate { get; set; }
        public string OriginDepartment { get; set; } = string.Empty;
        public string TargetDepartment { get; set; } = string.Empty;
        public string AssignedUser { get; set; } = string.Empty;
        public string Remarks { get; set; } = string.Empty; // Action required or notes
        public string MovementStatus { get; set; } = string.Empty; // Pending, Received, Transferred, Resolved
        public DateTime? ReceivedDate { get; set; }
    }
}
