import firebase from 'firebase/app';
import 'firebase/firestore';
import {
  ADDRESS_FETCH_SUCCESS,
  ADDRESS_FETCH_PENDING,
  ADDRESS_UPDATE_FORM,
  ADDRESS_CREATE_SUCCESS,
  ADDRESS_UPDATE_SUCCESS,
  ADDRESS_DELETED_SUCCESS
} from './types';
import { USERS, ADDRESSES } from './resources';

export const addressListFetchByUserId = () => {
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

export const fetchAddressListPending = () => {
  return (dispatch) => {
    dispatch({type: ADDRESS_FETCH_PENDING});
  }
}

export const addressCreate = (address) => {
  const user = firebase.auth().currentUser;
  const userId = user ? user.uid : '';
  address.userId = userId;
  return (dispatch) => {
    firebase.firestore().collection(USERS).doc(userId).collection(ADDRESSES)
    .add(address)
      .then(() => {
        dispatch({ type: ADDRESS_CREATE_SUCCESS, payload: address});  
      })
      .catch(error => {
        console.error("It was not created the address", error);
      })
  };
};

export const addressUpdate = ({ name, street, numberStreet, departmentNumber, city, town, latitude, longitude, streetReference, phone, uid}) => {
  const addressUpdate = { name, street, numberStreet, departmentNumber, city, town, latitude, longitude, streetReference, phone, uid}
  const {currentUser} = firebase.auth();
  const userId = currentUser ? currentUser.uid : '';
  return (dispatch) => {
    firebase.firestore().collection(USERS).doc(userId).collection(ADDRESSES).doc(uid)
    .update({ name, street, numberStreet, departmentNumber, city, town,latitude, longitude, streetReference, phone, userId })
    .then(() => {
      console.info(`Address updated`);
      dispatch({type: ADDRESS_UPDATE_SUCCESS, payload: addressUpdate});
    }).catch(error => {
      console.info("there was an error at update the address, error:", error);
    });
  };
};

export const deleteAddress = (addressId) => {
  const { currentUser } = firebase.auth();
  const userId = currentUser ? currentUser.uid : '';
  return (dispatch) => {
    firebase.firestore().collection(USERS).doc(userId).collection(ADDRESSES).doc(addressId)
    .delete()
    .then(() => {
      console.log('addrress delete');
      dispatch({ type: ADDRESS_DELETED_SUCCESS, payload: addressId });
    })
    .catch((error) => console.log('Error at remove', error))
  };
};

export const addressUpdateForm = ({ prop, value }) => {
  return {
    type: ADDRESS_UPDATE_FORM,
    payload: { prop, value }
  }
};
