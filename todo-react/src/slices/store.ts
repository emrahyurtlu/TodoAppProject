import {combineReducers, configureStore} from "@reduxjs/toolkit"
import todos from "./todo/load-todos-slice"

const reducers = combineReducers({
  todos,
})

const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
})

export default store
