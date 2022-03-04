const initialState = {
  appState: ""
}

export const appStateReducer = (state=initialState, action) => {
  switch(action.type){
    case "SET_APP_STATE":
      return {
        ...state,
        appState: action.payload
      }
    default:
      return state
  }
}