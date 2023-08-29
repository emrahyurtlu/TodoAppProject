import {combineReducers, configureStore} from "@reduxjs/toolkit"
import thunk from "redux-thunk"
import todos from "./todo/load-todos-slice"

const reducers = combineReducers({
  todos,
})

const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}).concat(thunk),
})

export default store
