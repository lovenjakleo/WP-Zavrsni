using KnjiznicaApp.Models;
using Microsoft.EntityFrameworkCore;


namespace KnjiznicaApp.Data
{
    public class KnjiznicaContext : DbContext
    {
        public KnjiznicaContext(DbContextOptions<KnjiznicaContext> opcije)
            : base(opcije) { }
        public DbSet<Knjiga> Knjiga { get; set; }


    }


}