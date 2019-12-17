import firebase from 'firebase';
import { ORDERS_FETCH_SUCCESS, ORDER_FETCH_SUCCESS } from './types';

export const orderFetchByUserIdAndStoreId = (storeId) => {
  return (dispatch) => {
    firebase.database().ref(`/orders`).orderByChild('storeId').equalTo(storeId) //Todo filter by userId and state too
      .on('value', snapshot => {
        dispatch({ type: ORDERS_FETCH_SUCCESS, payload: snapshot.val() });
      });
  };
};

export const orderFetchByOrderId = (orderId) => {
  return (dispatch) => {
    firebase.database().ref(`/orders/${orderId}`)
      .on('value', snapshot => {
        dispatch({ type: ORDER_FETCH_SUCCESS, payload: snapshot.val() });
      });
  };
};
