using Microsoft.AspNetCore.Mvc;
using TodoApp.Api.Dtos;
using TodoApp.Api.Enums;
using TodoApp.Api.Models;
using TodoApp.Api.Services;

namespace TodoApp.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TodoItemsController : ControllerBase
    {
        private readonly TodoItemService _todoItemService;

        public TodoItemsController(TodoItemService todoItemService)
        {
            _todoItemService = todoItemService;
        }

        // GET: api/<TodoItemsController>
        [HttpGet]
        public IEnumerable<TodoItem> Get(TodoState state = TodoState.Todo, string? query = null)
        {
            if (query is not null)
            {
                return _todoItemService.Search(state, query);
            }

            return _todoItemService.GetAll().Where(t => t.State == state).ToList();
        }

        // GET api/<TodoItemsController>/5
        [HttpGet("{id}")]
        public IActionResult Get(Guid id)
        {
            try
            {
                var entity = _todoItemService.Get(id);
                return Ok(entity);
            }
            catch (Exception ex)
            {
                return BadRequest("Please try again. " + ex.Message);
            }

        }

        // POST api/<TodoItemsController>
        [HttpPost]
        public IActionResult Post([FromBody] TodoItemDto todoItemDto)
        {
            var todoItem = new TodoItem
            {
                Title = todoItemDto.Title,
                Description = todoItemDto.Description,
                State = Enums.TodoState.Todo,
                CreatedAt = DateTime.Now,
                UpdatedAt = DateTime.Now
            };

            _todoItemService.Add(todoItem);

            if (todoItem.TodoItemId != default)
                return Ok("New todo is added.");
            else
                return BadRequest("Please try again");
        }

        // PUT api/<TodoItemsController>/5
        [HttpPut]
        public IActionResult Put([FromBody] TodoItem todoItem)
        {
            todoItem.UpdatedAt = DateTime.Now;
            _todoItemService.Update(todoItem);

            return Ok("Todo is updated.");
        }

        // DELETE api/<TodoItemsController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(Guid id)
        {
            _todoItemService.Remove(id);
            IActionResult result = Get(id);

            if (result is BadRequestObjectResult)
                return Ok("Todo is deleted.");
            else
                return BadRequest((result as BadRequestObjectResult).Value);

        }
    }
}
