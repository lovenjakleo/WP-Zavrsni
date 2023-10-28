using KnjiznicaApp.Data;
using KnjiznicaApp.Models;
using Microsoft.AspNetCore.Mvc;


namespace KnjiznicaApp.Controllers
{
    /// <summary>
    /// Namijenjeno za CRUD operacije na entitetom knjiga u bazi
    /// </summary>
    [ApiController]
    [Route("api/v1/[controller]")]
    public class KnjiznicaController : ControllerBase
    {

        // Dependency injection u controller
        // https://learn.microsoft.com/en-us/aspnet/core/tutorials/first-mvc-app/adding-model?view=aspnetcore-7.0&tabs=visual-studio#dependency-injection
        private readonly KnjiznicaContext _context;

        public KnjiznicaController(KnjiznicaContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Dohvaća sve knjige iz baze
        /// </summary>
        /// <remarks>
        /// Primjer upita:
        ///
        ///    GET api/v1/Knjiga
        ///
        /// </remarks>
        /// <returns>Knjige u bazi</returns>
        /// <response code="200">Sve je u redu</response>
        /// <response code="400">Zahtjev nije valjan (BadRequest)</response> 
        /// <response code="503">Na azure treba dodati IP u firewall</response> 
        [HttpGet]
        public IActionResult Get()
        {
            // kontrola ukoliko upit nije dobar
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                var knjige = _context.Knjiga.ToList();
                if (knjige == null || knjige.Count == 0)
                {
                    return new EmptyResult();
                }
                return new JsonResult(_context.Knjiga.ToList());
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status503ServiceUnavailable,
                                    ex.Message);
            }



        }

        [HttpGet]
        [Route("{sifra:int}")]
        public IActionResult GetBySifra(int sifra)
        {

            if (sifra <= 0)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var s = _context.Knjiga.Find(sifra);

                if (s == null)
                {
                    return StatusCode(StatusCodes.Status204NoContent, s);
                }

                return new JsonResult(s);

            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status503ServiceUnavailable, ex.Message);
            }

        }


        /// <summary>
        /// Dodaje knjigu u bazu
        /// </summary>
        /// <remarks>
        /// Primjer upita:
        ///
        ///    POST api/v1/Knjiga
        ///    {naslov:"",autor:""}
        ///
        /// </remarks>
        /// <returns>Kreirane knjige u bazi s svim podacima</returns>
        /// <response code="200">Sve je u redu</response>
        /// <response code="400">Zahtjev nije valjan (BadRequest)</response> 
        /// <response code="503">Na azure treba dodati IP u firewall</response> 
        [HttpPost]
        public IActionResult Post(Knjiga knjiga)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                _context.Knjiga.Add(knjiga);
                _context.SaveChanges();
                return StatusCode(StatusCodes.Status201Created, knjiga);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status503ServiceUnavailable,
                                   ex.Message);
            }



        }




        /// <summary>
        /// Mijenja podatke postojeće knjige u bazi
        /// </summary>
        /// <remarks>
        /// Primjer upita:
        ///
        ///    PUT api/v1/knjiga/1
        ///
        /// {
        ///  "sifra": 0,
        ///  "isbn": "Novi isbn",
        ///  "naslov":"Novi naslov",
        ///  "autor": ,
        ///  "dostupne_kolicine": ,
        /// }
        ///
        /// </remarks>
        /// <param name="sifra">Šifra knjige koja se mijenja</param>  
        /// <returns>Svi poslani podaci od knjige</returns>
        /// <response code="200">Sve je u redu</response>
        /// <response code="204">Nema u bazi knjige koju želimo promijeniti</response>
        /// <response code="415">Nismo poslali JSON</response> 
        /// <response code="503">Na azure treba dodati IP u firewall</response> 
        [HttpPut]
        [Route("{sifra:int}")]
        public IActionResult Put(int sifra, Knjiga knjiga)
        {

            if (sifra <= 0 || knjiga == null)
            {
                return BadRequest();
            }

            try
            {
                var knjigaBaza = _context.Knjiga.Find(sifra);
                if (knjigaBaza == null)
                {
                    return BadRequest();
                }
                // inače se rade Mapper-i
                // mi ćemo za sada ručno
                knjigaBaza.isbn = knjiga.isbn;
                knjigaBaza.naslov = knjiga.naslov;
                knjigaBaza.autor = knjiga.autor;
                knjigaBaza.dostupne_kolicine = knjiga.dostupne_kolicine;


                _context.Knjiga.Update(knjigaBaza);
                _context.SaveChanges();

                return StatusCode(StatusCodes.Status200OK, knjigaBaza);

            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status503ServiceUnavailable,
                                  ex); // kada se vrati cijela instanca ex tada na klijentu imamo više podataka o grešci
                // nije dobro vraćati cijeli ex ali za dev je OK
            }

        }


        /// <summary>
        /// Briše knjigu iz baze
        /// </summary>
        /// <remarks>
        /// Primjer upita:
        ///
        ///    DELETE api/v1/knjiga/1
        ///    
        /// </remarks>
        /// <param name="sifra">Šifra knjige koja se briše</param>  
        /// <returns>Odgovor da li je obrisano ili ne</returns>
        /// <response code="200">Sve je u redu</response>
        /// <response code="204">Nema u bazi knjige koju želimo obrisati</response>
        /// <response code="415">Nismo poslali JSON</response> 
        /// <response code="503">Na azure treba dodati IP u firewall</response> 
        [HttpDelete]
        [Route("{sifra:int}")]
        [Produces("application/json")]
        public IActionResult Delete(int sifra)
        {
            if (sifra <= 0)
            {
                return BadRequest();
            }

            var knjigaBaza = _context.Knjiga.Find(sifra);
            if (knjigaBaza == null)
            {
                return BadRequest();
            }

            try
            {
                _context.Knjiga.Remove(knjigaBaza);
                _context.SaveChanges();

                return new JsonResult("{\"poruka\":\"Obrisano\"}");

            }
            catch (Exception ex)
            {

                return new JsonResult("{\"poruka\":\"Ne može se obrisati\"}");

            }
        }
    }
}