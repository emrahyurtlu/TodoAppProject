using TodoApp.Api.Models;

namespace TodoApp.Api.Services
{
    public interface ITodoItemService
    {
        TodoItem Get(Guid itemId);
        IEnumerable<TodoItem> GetAll();
        void Add(TodoItem todoItem);
        void Update(TodoItem todoItem);
        void Remove(Guid todoItemId);
        IEnumerable<TodoItem> Search(string query);
    }
}
