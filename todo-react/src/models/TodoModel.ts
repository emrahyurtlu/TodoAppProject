import TodoState from "./TodoState"

interface TodoModel {
  TodoItemId: string
  Title: string
  Description: string | null
  State: TodoState
  CreatedAt: Date
  UpdatedAt?: Date
}

export default TodoModel
