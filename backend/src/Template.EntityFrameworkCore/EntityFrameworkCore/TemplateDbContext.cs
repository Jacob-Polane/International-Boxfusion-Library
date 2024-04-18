using Microsoft.EntityFrameworkCore;
using Abp.Zero.EntityFrameworkCore;
using Template.Authorization.Roles;
using Template.Authorization.Users;
using Template.MultiTenancy;
using Template.Domain.Model;

namespace Template.EntityFrameworkCore
{
    public class TemplateDbContext : AbpZeroDbContext<Tenant, Role, User, TemplateDbContext>
    {
        /* Define a DbSet for each entity of the application */
        public DbSet<Book> Books { get; set; }
        public DbSet<Borrower> Borrowers { get; set; }
        public DbSet<Librarian> Librarians { get; set; }
        public DbSet<OutBook> Outbooks { get; set; }
        public DbSet<File> Files { get; set; }
        public DbSet<Comment> Comment { get; set; }
        public TemplateDbContext(DbContextOptions<TemplateDbContext> options)
            : base(options)
        {
        }
    }
}
