import { SET_ALL_USERS, SET_ERROR, SET_LOADING } from "../constants";
import { auth, db } from "../../firebase";

export const setAllUsers = async (dispatch) => {
  //må returnere alle brukere untatt seg selv
  let users = []
  dispatch({ type: SET_LOADING, payload: true})

  await db.collection("usersCollection").get()
  .then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      users.push(doc.data())
    });
    dispatch({type: SET_ALL_USERS, payload: users})
  })
  .catch(err =>
    dispatch({type: SET_ERROR, payload: err})
  );
}