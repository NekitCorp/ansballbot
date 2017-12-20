using AnsBallBot.Database.Entities;
using AnsBallBot.Helpers;
using Microsoft.EntityFrameworkCore;

namespace AnsBallBot.Database
{
    public class ApplicationContext : DbContext
    {
        public DbSet<ChatState> ChatStates { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            var configuration = ConfigurationHelper.Config();
            optionsBuilder.UseNpgsql(configuration["DatabaseConnectionString"]);
        }
    }
}
