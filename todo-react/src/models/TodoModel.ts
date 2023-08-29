import TodoState from "./TodoState"

interface TodoModel {
  todoItemId: string
  title: string
  description: string | null
  state: TodoState
  createdAt: string
  updatedAt?: string
}

export default TodoModel
