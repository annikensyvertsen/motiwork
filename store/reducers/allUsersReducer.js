//bruker ikke denne nå, bruker bare userReducer enn så lenge

const initialState = {
  users: [],
  loading: false,
  error: null,
}

export const allUsersReducer = (state=initialState, action) => {
  switch(action.type){
    case "SET_ALL_USERS":
      return {
        ...state,
        users: action.payload,
        error: null,
        loading: false
      }
    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload
      }
    case "SET_ERROR": 
      return {
        ...state,
        error: action.payload,
        loading: false
      }
    default:
      return state
  }
}