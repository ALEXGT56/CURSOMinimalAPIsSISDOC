using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SisDoc.DataAccess.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace SisDoc.DataAccess.Configurations
{
    public class GlobalStatusConfiguration : IEntityTypeConfiguration<GlobalStatus>
    {
        public void Configure(EntityTypeBuilder<GlobalStatus> builder)
        {
            builder.HasKey(c => c.Id);

            builder.Property(c => c.Name)
                .IsRequired()
                .HasMaxLength(100);
            {

            }
        }
    }
}
