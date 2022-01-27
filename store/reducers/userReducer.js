const initialState = {
  user:  {
    uid: "",
    name: "",
    points: 0,
    totalWorkload: 0,
    currentGoal: {
      // endDate: {},
      // startDate: {},
      // goalName: "",
      // isCompleted: false,
      // reward: "",
      // workload: 0,
      // workloadGoal: 0,
    },
    friends: [],
    incomingFriendRequests: [],
    outgoingFriendRequests: [],
  },
  allUsers: [],
  loading: false,
  error: null,
 
}

export const userReducer = (state=initialState, action) => {
  //console.log("in user reducer" ,state, action.payload)
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
    case "SET_USER": 
      return {
        ...state,
        user: action.payload,
        loading: false,
        error: null,
      }
    case "SET_ALL_USERS":
      return {
        ...state,
        allUsers: action.payload,
        error: null,
        loading: false
      }
    case "SET_POINTS":
      return {
        ...state,
        user: {
          ...state.user,
          points: action.payload
        }
      }
    case "SET_GOAL":
      return {
        ...state,
        user: {
          ...state.user,
          currentGoal: action.payload
        }
      }
    default:
      return state
  }
}