using Microsoft.AspNetCore.Mvc;
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
        public TodoItem Get(Guid id)
        {
            return _todoItemService.Get(id);
        }

        // POST api/<TodoItemsController>
        [HttpPost]
        public void Post([FromBody] TodoItem todoItem)
        {
            todoItem.CreatedAt = DateTime.Now;
            todoItem.UpdatedAt = DateTime.Now;
            _todoItemService.Add(todoItem);
        }

        // PUT api/<TodoItemsController>/5
        [HttpPut]
        public void Put([FromBody] TodoItem todoItem)
        {
            todoItem.UpdatedAt = DateTime.Now;
            _todoItemService.Update(todoItem);
        }

        // DELETE api/<TodoItemsController>/5
        [HttpDelete("{id}")]
        public void Delete(Guid id)
        {
            _todoItemService.Remove(id);
        }
    }
}
