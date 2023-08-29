using Microsoft.AspNetCore.Mvc;
using TodoApp.Api.Dtos;
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
        public IEnumerable<TodoItem> Get()
        {
            return _todoItemService.GetAll();
        }

        // GET api/<TodoItemsController>/5
        [HttpGet("{id}")]
        public IActionResult Get(Guid id)
        {
            var entity = _todoItemService.Get(id);
            if (entity is not null)
                return Ok(entity);
            else
                return BadRequest("Please try again");
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

            return Ok();
        }

        // DELETE api/<TodoItemsController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(Guid id)
        {
            _todoItemService.Remove(id);
            var entity = Get(id);

            if (entity is null)
                return Ok("Todo is deleted.");
            else
                return BadRequest("Please try again");

        }
    }
}
