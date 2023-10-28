namespace KnjiznicaApp.Models.DTO
{
    public class KnjigaDTO
    {
        public int sifra { get; set; }
        public string? isbn { get; set; }
        public string? naslov { get; set; }
        public string? autor { get; set; }
        public int? dostupne_kolicine { get; set; }
    }
}