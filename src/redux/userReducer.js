import { UPDATE_USER } from "./userAction";

const initState = {
  id: null,
  name: null,
  trackedEvents: []
}

export const userReducer = (state = initState, action) => {
  switch (action.type) {
    case UPDATE_USER:
      return {
        ...state,
        id: action.payload.id,
        name: action.payload.name,
        trackedEvents: action.payload.trackedEvents || [],
      }
      break;

    default:
      return state
      break;
  }
}
