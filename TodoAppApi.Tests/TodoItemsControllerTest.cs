using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TodoApp.Api.Controllers;
using TodoApp.Api.Dal;
using TodoApp.Api.Dtos;
using TodoApp.Api.Models;
using TodoApp.Api.Services;

namespace TodoAppApi.Tests
{
    public class TodoItemsControllerTest
    {
        TodoItemsController _controller;
        ITodoItemService _service;
        TodoContext _context;
        public TodoItemsControllerTest()
        {
            var options = new DbContextOptionsBuilder<TodoContext>()
             .UseInMemoryDatabase(databaseName: "FakeDatabase")
             .Options;
            _context = new TodoContext(options);
            _service = new TodoItemService(_context);
            _controller = new TodoItemsController(_service);
        }
        [Fact]
        public void GetAllTodosTest()
        {
            // arrange
            var todo1 = new TodoItemDto
            {
                Title = "Todo Title 1",
                Description = "Todo Description 1",
            };

            var todo2 = new TodoItemDto
            {
                Title = "Todo Title 2",
                Description = "Todo Description 2",
            };

            _controller.Post(todo1);
            _controller.Post(todo2);

            // act
            var result = _controller.Get();

            // assert
            Assert.IsType<OkObjectResult>(result.Result);
            var list = result.Result as OkObjectResult;

            var todos = list.Value as List<TodoItem>;

            Assert.Equal(2, todos.Count);
        }
    }
}