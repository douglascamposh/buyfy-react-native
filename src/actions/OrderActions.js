import firebase from 'firebase';
import { ORDERS_FETCH_SUCCESS, ORDER_FETCH_SUCCESS, ORDER_DELETED_SUCCESS } from './types';

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

export const deleteOrder = (orderId) => {
  return (dispatch) => {
    firebase.database().ref(`/orders/${orderId}`)
      .set(null)
      .then(() => {
        console.info(`Removed order with orderId: ${orderId}`);
        //dispatch({ type: ORDER_DELETED_SUCCESS });
      })
      .catch(error => {
        console.warn("Error at remove the Order", error);
      });
  };
};
