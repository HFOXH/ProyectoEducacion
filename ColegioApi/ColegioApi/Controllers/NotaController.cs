using ColegioApi.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ColegioApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NotaController : Controller
    {
        private readonly AplicationDBContext context;
        public NotaController(AplicationDBContext context)
        {
            this.context = context;
        }
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var listNotas = await context.Nota.ToListAsync();
                return Ok(listNotas);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            try
            {
                var nota = context.Nota.FirstOrDefault(p => p.Id == id);
                return Ok(nota);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Nota nota)
        {
            try
            {
                context.Add(nota);
                await context.SaveChangesAsync();
                return Ok(nota);

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] Nota nota)
        {
            try
            {
                if (id != nota.Id)
                    return NotFound();
                context.Update(nota);
                await context.SaveChangesAsync();
                return Ok(new { message = "El registro fue actualizado con exito" });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var id_nota = await context.Nota.FindAsync(id);
                if (id_nota == null)
                    return NotFound();
                context.Nota.Remove(id_nota);
                await context.SaveChangesAsync();
                return Ok(new { message = "El registro se ha eliminado con exito" });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
