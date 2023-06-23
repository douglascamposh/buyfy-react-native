import firebase from "firebase";
import 'firebase/firestore';
import {
    DELIVERY_STATUS_CREATE_SUCCESS,
    DELIVERY_STATUS_FETCH_SUCCESS,
    DELIVERY_STATUS_FETCH_PENDING,
    DELIVERY_STATUS_UPDATE_SUCCESS
} from './types';
import { DELIVERY_STATUS } from './resources';

export const deliveryStatusCreate = (item) => {
    const user = firebase.auth().currentUser;
    const userId = user ? user.uid : '';
    item.userId = userId;
    item.createdAt = Date.now();
    item.updatedAt = Date.now();
    item.states = [{userId: userId, state: item.state, createdAt: Date.now(), updatedAt: Date.now()}];
    return (dispatch) => {
      firebase.firestore().collection(DELIVERY_STATUS)
      .add(item)
        .then(() => {
          dispatch({ type: DELIVERY_STATUS_CREATE_SUCCESS, payload: item});  
        })
        .catch(error => {
          console.error("Delivery Status was not created", error);
        })
    };
  };

  export const deliveryStatusUpdate = (item) => {
    const {uid} = item;
    delete item.uid;
    const user = firebase.auth().currentUser;
    const userId = user ? user.uid : '';
    item.userId = userId;
    item.updatedAt = Date.now();
    item.states.push({userId: userId, state: item.state, createdAt: Date.now(), updatedAt: Date.now()});
    return (dispatch) => {
      firebase.firestore().collection(DELIVERY_STATUS).doc(uid)
      .update(item)
        .then(() => {
          dispatch({ type: DELIVERY_STATUS_UPDATE_SUCCESS, payload: {...item, uid}});  
        })
        .catch(error => {
          console.error("Delivery Status was not updated", error);
        })
    };
  };

export const deliveryStatusFetchByUserIdAndInvoiceId = (invoiceId) => {
  const user = firebase.auth().currentUser;
  const userId = user ? user.uid : '';
  return (dispatch) => {
    dispatch({ type: DELIVERY_STATUS_FETCH_PENDING });
    firebase.firestore().collection(DELIVERY_STATUS)
    .where('userId','==', userId)
    .where('invoiceId', '==', invoiceId)
    //.where('state', '==', 1) // deberia ser parametro
    //.orderBy('createdAt', 'desc') //se necesita indexar en firebase
    .get()
    .then(snapshot => {
      const deliveryStatusList = snapshot.docs.map(doc => {
        return { ...doc.data(), uid: doc.id }
      });
      console.log("deliveryStatusFetchByUserIdAndInvoiceId deliveryStatusList", deliveryStatusList);
      dispatch({ type: DELIVERY_STATUS_FETCH_SUCCESS, payload: deliveryStatusList });
    })
    .catch(error => console.info('a error ocurred in stores by userId Fetch List',error));
  };
}
