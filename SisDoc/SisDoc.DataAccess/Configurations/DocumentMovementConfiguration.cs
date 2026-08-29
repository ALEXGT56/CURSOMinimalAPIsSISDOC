using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SisDoc.DataAccess.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace SisDoc.DataAccess.Configurations
{
    public class DocumentMovementConfiguration : IEntityTypeConfiguration<DocumentMovement>
    {
        public void Configure(EntityTypeBuilder<DocumentMovement> builder)
        {
            builder.HasKey(c => c.Id);

            builder.HasOne(c => c.DocumentTicket)
              .WithMany(s => s.MovementHistory)
              .HasForeignKey(c => c.TicketId)
              .OnDelete(DeleteBehavior.Cascade);

        }
    }
}
