
using EventManagementPro.Models;
using Microsoft.EntityFrameworkCore;

namespace EventManagementPro.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options) { }

        public DbSet<UserData> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<UserData>()
                .ToTable("Users", "Event_Management");

            base.OnModelCreating(modelBuilder);
        }
    }
}
