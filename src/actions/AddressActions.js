import firebase from 'firebase';
import {
  ADDRESS_FETCH_SUCCESS,
  ADDRESS_UPDATE_FORM,
  ADDRESS_CREATE,
  ADDRESS_UPDATE
} from './types';

export const addressFetchByUserId = () => {
  return (dispatch) => {
    const user = firebase.auth().currentUser;
    const userId = user ? user.uid : '';
    firebase.database().ref(`/addresses`).orderByChild('userId').equalTo(userId)
      .on('value', snapshot => {
        dispatch({ type: ADDRESS_FETCH_SUCCESS, payload: snapshot.val() });
      });
  };
};

export const addressCreate = (address) => {
  const user = firebase.auth().currentUser;
  const userId = user ? user.uid : '';
  address.userId = userId;
  return (dispatch) => {
    firebase.database().ref(`/addresses`)
      .push(address)
      .then(() => {
        console.info(`Address Created`);
        dispatch({ type: ADDRESS_CREATE });
      })
      .catch(error => {
        console.warn("It was not created the address", error);
      });
  };
};

export const addressUpdate = ({ street, numberStreet, departmentNumber, city, town, streetReference, phone, uid }) => {
  const {currentUser} = firebase.auth();
  const userId = currentUser ? currentUser.uid : '';
  return (dispatch) => {
    firebase.database().ref(`/addresses/${uid}`)
    .set({ street, numberStreet, departmentNumber, city, town, streetReference, phone, userId })
    .then(() => {
      console.info(`Address updated`);
      dispatch({type: ADDRESS_UPDATE});
      Actions.pop();
    }).catch(error => {
      console.info("there was an error at update the address, error:", error);
    });
  };
};

export const addressUpdateForm = ({ prop, value }) => {
  return {
    type: ADDRESS_UPDATE_FORM,
    payload: { prop, value }
  }
};
