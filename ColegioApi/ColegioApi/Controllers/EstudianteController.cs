using ColegioApi.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ColegioApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EstudianteController : Controller
    {
        private readonly AplicationDBContext context;
        public EstudianteController(AplicationDBContext context)
        {
            this.context = context;
        }
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var listEstudiantes = await context.Estudiante.ToListAsync();
                return Ok(listEstudiantes);
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
                var estudiante = context.Estudiante.FirstOrDefault(p => p.Id == id);
                return Ok(estudiante);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Estudiante estudiante)
        {
            try
            {
                context.Add(estudiante);
                await context.SaveChangesAsync();
                return Ok(estudiante);

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] Estudiante estudiante) 
        {
            try
            {
                if (id != estudiante.Id)
                    return NotFound();
                context.Update(estudiante);
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
            var id_estudiante = context.Estudiante.FirstOrDefault(p => p.Id == id);
            if (id_estudiante != null)
            {
                context.Estudiante.Remove(id_estudiante);
                context.SaveChanges();
                return Ok();
            }
            else
            {
                return BadRequest();
            }

        }
    }
}
