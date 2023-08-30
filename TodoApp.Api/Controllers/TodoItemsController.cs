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
        private readonly ITodoItemService _todoItemService;

        public TodoItemsController(ITodoItemService todoItemService)
        {
            _todoItemService = todoItemService;
        }

        // GET: api/<TodoItemsController>
        [HttpGet]
        public ActionResult<IEnumerable<TodoItem>> Get(string? query = null)
        {
            IEnumerable<TodoItem> result = null;
            if (query is not null)
            {
                result = _todoItemService.Search(query);
            }
            else
            {
                result = _todoItemService.GetAll();
            }

            if (result.Count() > 0)
                return Ok(result);
            else
                return new EmptyResult();
        }

        // GET api/<TodoItemsController>/5
        [HttpGet("{id}")]
        public ActionResult<TodoItem> Get(Guid id)
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
        public ActionResult<string> Post([FromBody] TodoItemDto todoItemDto)
        {
            var todoItem = new TodoItem
            {
                Title = todoItemDto.Title,
                Description = todoItemDto.Description,
                State = Enums.TodoState.Todo,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            _todoItemService.Add(todoItem);

            if (todoItem.TodoItemId != default)
                return Ok("New todo is added.");
            else
                return BadRequest("Please try again");
        }

        // PUT api/<TodoItemsController>/5
        [HttpPut]
        public ActionResult<string> Put([FromBody] TodoItem todoItem)
        {
            todoItem.UpdatedAt = DateTime.UtcNow;
            _todoItemService.Update(todoItem);

            return Ok("Todo is updated.");
        }

        // DELETE api/<TodoItemsController>/5
        [HttpDelete("{id}")]
        public ActionResult<string> Delete(Guid id)
        {
            _todoItemService.Remove(id);
            var result = Get(id);

            if (result.Result is BadRequestObjectResult)
                return Ok("Todo is deleted.");
            else
                return BadRequest(result.Value);

        }
    }
}
