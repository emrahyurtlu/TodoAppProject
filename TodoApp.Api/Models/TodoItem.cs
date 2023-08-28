using TodoApp.Api.Enums;

namespace TodoApp.Api.Models
{
    public class TodoItem
    {
        public Guid TodoItemId { get; set; }
        public string Title { get; set; }
        public string? Description { get; set; }
        public TodoState State { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}
