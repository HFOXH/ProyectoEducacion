using ColegioApi.Models;
using Microsoft.EntityFrameworkCore;

namespace ColegioApi
{
    public class AplicationDBContext: DbContext
    {
        public DbSet<Estudiante> Estudiante { get; set; }
        public DbSet<Profesor> Profesor { get; set; }
        public DbSet<Nota> Nota { get; set; }
        public AplicationDBContext(DbContextOptions<AplicationDBContext> options) : base(options)
        {

        }
    }
}
