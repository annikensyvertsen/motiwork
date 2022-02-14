//man trenger bare cooperations som den personen er en del av, det er ingen grunn til å se andre 
const initialState = {
  cooperations: [
    {
      name: "",
      members: [],
      archivedChallenges: [],
      activeChallenge: {},
      id: ""
    }

  ],
  allActiveChallenges: [

  ],
  loading: false,
  error: null
}

export const cooperationsReducer = (state=initialState, action) => {
  switch(action.type){
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
    case "SET_COOPERATIONS":
      return {
        ...state,
        cooperations: action.payload,
        error: null,
        loading: false
      }
    case "SET_ALL_CHALLENGES": 
      return {
        ...state,
        allActiveChallenges: action.payload,
        error: null,
        loading: false
      }
    default:
      return state
  }
}