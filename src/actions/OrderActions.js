import firebase from 'firebase';
import {
  ORDERS_FETCH_SUCCESS,
  ORDER_FETCH_SUCCESS,
  ORDER_DELETED_SUCCESS,
  PRODUCT_CREATE_ORDER,
  PRODUCT_UPDATE_ORDER } from './types';
import { orderStates } from '../constants/Enum';

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

export const orderCreate = (order) => {
  order.state = orderStates.draft;
  return (dispatch) => {
    firebase.database().ref(`/orders`)
      .push(order) //filter should by storeId and UserId
      .then(() => {
        console.info(`Order Created`);
        dispatch({ type: PRODUCT_CREATE_ORDER });
      })
      .catch(error => {
        console.warn("It was not add the order", error);
      });
  };
};

export const orderUpdate = (orderId, { ...order }) => {
  return (dispatch) => {
    firebase.database().ref(`/orders/${orderId}`)
      .set(order)
      .then(() => {
        console.info(`Updated order, orderId: ${orderId}`);
        dispatch({ type: PRODUCT_UPDATE_ORDER });
      })
      .catch(error => {
        console.warn("Error at update the Order", error);
      });
  };
};
