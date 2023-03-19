using System.ComponentModel.DataAnnotations;

namespace ColegioApi.Models
{
    public class Nota
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Nombre { get; set; }
        [Required]
        public int IdProfesor { get; set; }
        [Required]
        public int IdEstudiante { get; set; }
        [Required]
        public decimal Valor { get; set; }
    }
}
