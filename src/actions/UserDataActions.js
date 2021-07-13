import firebase from 'firebase';
import { USER_FETCH_SUCCESS, USER_DATA_UPDATE, USER_LOGOUT_SUCCESS } from './types';
import { USERS } from './resources';

export const fetchUserData = () => {
  return(dispatch) => {
    const user = firebase.auth().currentUser;
    user ? user.uid : '';
    dispatch({ type: USER_FETCH_SUCCESS, payload: { ...user } })
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

export const userLogOut = () => {
  return(dispatch) => {
      firebase.auth().signOut();
      firebase.auth().onAuthStateChanged(userSignOut => {
        if (!userSignOut) {     
            dispatch({type: USER_LOGOUT_SUCCESS, payload: { isLoged:false }})
          };
        }      
      );
    }
  }
