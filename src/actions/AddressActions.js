import firebase from 'firebase/app';
import 'firebase/firestore';
import {
  ADDRESS_FETCH_SUCCESS,
  ADDRESS_UPDATE_FORM,
  ADDRESS_CREATE,
  ADDRESS_UPDATE
} from './types';
import { USERS, ADDRESSES } from './resources';

export const addressFetchByUserId = () => {
  return (dispatch) => {
    const user = firebase.auth().currentUser;
    const userId = user ? user.uid : '';
    firebase.firestore().collection(USERS).doc(userId).collection(ADDRESSES).get()
    .then( snapshot => {
        const docs = snapshot.docs.map(doc => {
          return { ...doc.data(), uid: doc.id }
        });
        dispatch({ type: ADDRESS_FETCH_SUCCESS, payload: docs });    
    })
    .catch(error => console.log(error))
  };
};

export const addressCreate = (address) => {
  const user = firebase.auth().currentUser;
  const userId = user ? user.uid : '';
  address.userId = userId;
  return (dispatch) => {
    firebase.firestore().collection(USERS).doc(userId).collection(ADDRESSES)
    .add(address)
      .then(() => {
        dispatch({ type: ADDRESS_CREATE });  
      })
      .catch(error => {
        console.error("It was not created the address", error);
      })
  };
};

export const addressUpdate = ({ name, street, numberStreet, departmentNumber, city, town, streetReference, phone, uid}) => {
  const {currentUser} = firebase.auth();
  const userId = currentUser ? currentUser.uid : '';
  return (dispatch) => {
    firebase.firestore().collection(USERS).doc(userId).collection(ADDRESSES).doc(uid)
    .update({ name, street, numberStreet, departmentNumber, city, town, streetReference, phone, userId })
    .then(() => {
      console.info(`Address updated`);
      dispatch({type: ADDRESS_UPDATE});
    }).catch(error => {
      console.info("there was an error at update the address, error:", error);
    });
  };
};

export const deleteAddress = (addressId) => {
  const { currentUser } = firebase.auth();
  const userId = currentUser ? currentUser.uid : '';
  return () => {
    firebase.firestore().collection(USERS).doc(userId).collection(ADDRESSES).doc(addressId)
    .delete()
    .then(() => console.log('addrress delete'))
    .catch((error) => console.log('Error at remove', error))
  };
};

export const addressUpdateForm = ({ prop, value }) => {
  return {
    type: ADDRESS_UPDATE_FORM,
    payload: { prop, value }
  }
};
