import firebase from 'firebase';
import { USER_FETCH_SUCCESS, USER_DATA_UPDATE } from './types';
import { USERS } from './resources';

export const fetchUserData = () => {
  return(dispatch) => {
    const user = firebase.auth().currentUser;
    const userId = user? user.uid : '';
    firebase.database().ref(`${USERS}/${userId}`)
    .on('value', snapshot => {
      dispatch({ type: USER_FETCH_SUCCESS, payload: snapshot.val() })
    })
  }
}

export const userDataUpdate = ({ firstName, lastName}) => {
  const { currentUser } = firebase.auth();
  const userId = currentUser ? currentUser.uid : '';
  return (dispatch) => {
    firebase.database().ref(`${USERS}/${userId}`)
      .set({ firstName, lastName })
    .then(() => {
      dispatch({type: USER_DATA_UPDATE});
    }).catch(error => {
      console.info("there was an error at update the user data, error:", error);
    });
  };
};