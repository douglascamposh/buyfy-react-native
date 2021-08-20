import firebase from 'firebase/app';
import 'firebase/firestore';
import { USER_FETCH_SUCCESS, USER_DATA_UPDATE, USER_LOGOUT_SUCCESS, USER_ERROR_DATA_UPDATE } from './types';
import { USERS } from './resources';

export const fetchUserData = () => {
  const { currentUser } = firebase.auth();
  if(currentUser){
    const userId = currentUser.uid
    return(dispatch) => {
      firebase.firestore().collection('users').doc(userId).get()
      .then(doc => {
        if (doc.exists) {
          const userData = { ...doc.data() };
          dispatch({type: USER_FETCH_SUCCESS, payload: {...userData, isLoged: true}})
        } 
      })
    }
  } else {
    return (dispatch) => {dispatch({type: USER_FETCH_SUCCESS})}
  }
}

export const userDataUpdate = ({ firstName, lastName }) => {
  const { currentUser } = firebase.auth();
  const userId = currentUser ? currentUser.uid : '';
  return (dispatch) => {
    firebase.firestore().collection('users').doc(userId)
    .update({ firstName, lastName })
    .then(() => {
      dispatch({type: USER_DATA_UPDATE, payload: { firstName, lastName, error: false }});
    }).catch(error => {
      console.info("there was an error at update the user data, error:");
      dispatch({type: USER_ERROR_DATA_UPDATE, payload: {error: error}});
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
