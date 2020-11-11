import { UPDATE_EVENT } from "./eventAction";

const initState = {
  list: []
}

export const eventReducer = (state = initState, action) => {
  switch (action.type) {
    case UPDATE_EVENT:
      return {
        ...state,
        list: action.payload,
      }
      break;

    default:
      return state
      break;
  }
}
