using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace KnjiznicaApp.Models
{
    public class Knjiga : Entitet
    {
        [Required]
        public string? isbn { get; set; }
        public string? naslov { get; set; }
        public string? autor { get; set; }
        public int? dostupne_kolicine { get; set; }

    }
}