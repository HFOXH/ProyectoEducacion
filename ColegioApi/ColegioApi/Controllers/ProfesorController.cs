using ColegioApi.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ColegioApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProfesorController : Controller
    {
        private readonly AplicationDBContext context;
        public ProfesorController(AplicationDBContext context)
        {
            this.context = context;
        }
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var listProfesores = await context.Profesor.ToListAsync();
                return Ok(listProfesores);
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
                var profesor = context.Profesor.FirstOrDefault(p => p.Id == id);
                return Ok(profesor);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Profesor profesor)
        {
            try
            {
                context.Add(profesor);
                await context.SaveChangesAsync();
                return Ok(profesor);

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] Profesor profesor)
        {
            try
            {
                if (id != profesor.Id)
                    return NotFound();
                context.Update(profesor);
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
                var id_profesor = await context.Profesor.FindAsync(id);
                if (id_profesor == null)
                    return NotFound();
                context.Profesor.Remove(id_profesor);
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
