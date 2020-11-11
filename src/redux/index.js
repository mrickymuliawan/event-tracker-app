import { combineReducers, createStore } from "redux"
import { eventReducer } from "./eventReducer"
import { userReducer } from "./userReducer"

const rootReducer = combineReducers({
  user: userReducer,
  event: eventReducer,
})

const configureStore = () => {
  return createStore(rootReducer)
}

export default configureStore