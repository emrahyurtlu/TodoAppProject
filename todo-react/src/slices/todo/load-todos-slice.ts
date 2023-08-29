import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import axios from "axios"
import TodoModel from "../../models/TodoModel"
import RequestStatus from "../../models/RequestStatus"
import TodoState from "../../models/TodoState"

const initialState = {
  data: [] as TodoModel[],
  status: "idle" as RequestStatus,
}

export const loadTodos = createAsyncThunk("GetTodos", async (data: {state: TodoState | null; query: string}) => {
  if (data.query == undefined || data.query == null) data.query = ""
  try {
    const response = await axios.get<TodoModel[]>("http://localhost:5108/api/todoitems", {data: data})
    return response.data
  } catch (error) {
    initialState.status = RequestStatus.Rejected
  }
})

const slice = createSlice({
  name: "todos",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(loadTodos.pending, (state, action) => {
        state.status = RequestStatus.Pending
      })
      .addCase(loadTodos.fulfilled, (state, action) => {
        state.status = RequestStatus.Fulfilled
        state.data = action.payload
      })
      .addCase(loadTodos.rejected, (state, action) => {
        state.status = RequestStatus.Rejected
      })
  },
  reducers: {},
})
export const todosSelector = (state) => state.todos.data
export const todosStatusSelector = (state) => state.todos.status

export default slice.reducer
