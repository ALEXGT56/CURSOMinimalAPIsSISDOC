using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SisDoc.DataAccess.Entities;

namespace SisDoc.DataAccess.Configurations
{
    public class UserConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.HasKey(c => c.Id);

            builder.Property(c => c.UserName)
                .IsRequired()
                .HasMaxLength(100);

            builder.HasIndex(c => c.UserName).IsUnique();

            builder.Property(c => c.PasswordHash)
                .IsRequired()
                .HasMaxLength(256);

            builder.Property(c => c.Rol)
                .IsRequired()
                .HasMaxLength(50);
        }
    }
}
