import firebase from 'firebase/app';
import 'firebase/firestore';
import {
  USER_LOGIN,
  USER_ERROR_LOGIN,
  USER_ERROR_SIGN_UP,
  USER_SIGN_UP,
  USER_PENDING
} from './types';

export const signInUser = ({email, password}) => {
  return(dispatch) => {
    dispatch({type: USER_PENDING});
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(() => dispatch({ type: USER_LOGIN, payload: {error:''}}))
    .catch(error => {
      dispatch({ type: USER_ERROR_LOGIN, payload: {email, error }})
    })
  }
}

export const createUser = (user) => {
  const {email, firstName, lastName, password} = user;
  return(dispatch) => {
    userPending();
    dispatch({type: USER_PENDING});
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((response)=>{
      const uid = response.user.uid;
      firebase.firestore().collection('users').doc(uid)
      .set({
        profilePicture: '',
        firstName: firstName,
        lastName: lastName,
        email: email,
        createdAt: Date.now()
      })
      dispatch({ type: USER_SIGN_UP, payload: {firstName, lastName, signUpError: ''}})
    }).catch(error => {
      dispatch({ type: USER_ERROR_SIGN_UP, payload: { error }})
    })
  }
}

export const userPending = () => {
  return (dispatch) => {
    dispatch({ type: USER_PENDING })
  }
}

