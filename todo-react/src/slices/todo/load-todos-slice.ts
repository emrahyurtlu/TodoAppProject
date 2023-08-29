import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import axios from "axios"
import RequestStatus from "../../models/RequestStatus"
import TodoModel from "../../models/TodoModel"
import Endpoints from "../../utils/endpoints"

const initialState = {
  data: [] as TodoModel[],
  status: "idle" as RequestStatus,
}

export const loadTodos = createAsyncThunk("GetTodos", async (query?: string | null) => {
  if (query == undefined || query == null) query = ""
  try {
    const response = await axios.get<TodoModel[]>(Endpoints.Todos, {data: {query: query}, params: {query: query}})
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
