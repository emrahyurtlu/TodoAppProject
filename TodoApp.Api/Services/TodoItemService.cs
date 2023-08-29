using TodoApp.Api.Dal;
using TodoApp.Api.Models;

namespace TodoApp.Api.Services
{
    public class TodoItemService : ITodoItemService
    {
        private readonly TodoContext _context;

        public TodoItemService(TodoContext context)
        {
            _context = context;
        }

        public TodoItem Get(Guid itemId)
        {
            var item = _context.TodoItem.Find(itemId);

            if (item == null)
            {
                throw new Exception("Todo item could not found.");
            }

            return item;
        }

        public IEnumerable<TodoItem> GetAll()
        {
            return _context.TodoItem.ToList();
        }

        public void Add(TodoItem todoItem)
        {
            var result = _context.TodoItem.Add(todoItem);
            _context.SaveChanges();
        }

        public void Update(TodoItem todoItem)
        {
            _context.TodoItem.Update(todoItem);
            _context.SaveChanges();
        }

        public void Remove(Guid todoItemId)
        {
            var todoItem = _context.TodoItem.Find(todoItemId);

            if (todoItem != null)
            {
                _context.TodoItem.Remove(todoItem);
                _context.SaveChanges();
            }
            else
            {
                throw new Exception("Todo item could not found.");
            }
        }

        public IEnumerable<TodoItem> Search(string query)
        {
            return _context.TodoItem.Where(t => t.Title.Contains(query) || t.Description.Contains(query)).ToList();
        }
    }
}
