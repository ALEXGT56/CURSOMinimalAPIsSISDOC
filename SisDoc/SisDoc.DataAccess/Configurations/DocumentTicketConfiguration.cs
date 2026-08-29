using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SisDoc.DataAccess.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace SisDoc.DataAccess.Configurations
{
    public class DocumentTicketConfiguration : IEntityTypeConfiguration<DocumentTicket>
    {
        public void Configure(EntityTypeBuilder<DocumentTicket> builder)
        {
            builder.HasKey(c => c.Id);

            builder.HasMany(c => c.MovementHistory)
                  .WithOne(d => d.DocumentTicket)
                  .HasForeignKey(d => d.TicketId)
                  .OnDelete(DeleteBehavior.Cascade);

        }

    }
}
