using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SisDoc.DataAccess.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace SisDoc.DataAccess.Configurations
{
    public class PersonConfiguration : IEntityTypeConfiguration<Person>
    {
        public void Configure(EntityTypeBuilder<Person> builder)
        {
            builder.HasKey(c => c.Id);

            builder.Property(c => c.Name)
                .IsRequired()
                .HasMaxLength(100);

            builder.Property(c => c.LastName)
                .IsRequired()
                .HasMaxLength(100);

            builder.Property(c => c.Email)
                .IsRequired()
                .HasMaxLength(200);

            builder.HasIndex(c => c.Email).IsUnique();

            builder.Property(c => c.Phone)
                .IsRequired()
                .HasMaxLength(20);

            builder.HasOne(c => c.User)
                .WithOne()
                .HasForeignKey<Person>(c => c.UserId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
