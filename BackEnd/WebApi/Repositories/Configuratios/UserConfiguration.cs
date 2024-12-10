using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WebApi.Repositories.Entities;

namespace WebApi.Repositories.Configurations;

public class UserConfiguration : IEntityTypeConfiguration<User>
{
    public void Configure(EntityTypeBuilder<User> builder)
    {
        builder.ToTable("Users");
        
        builder.HasKey(x => x.Id);
        builder.Property(x => x.Id)
            .HasColumnName("Id")
            .IsRequired();

        builder.Property(x => x.Name)
            .HasColumnName("UserName")
            .HasMaxLength(300)
            .IsRequired();

        builder.Property(x => x.Password)
            .HasColumnName("Password")
            .HasMaxLength(300)
            .IsRequired();
    }
}
