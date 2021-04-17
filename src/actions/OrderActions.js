import firebase from 'firebase/app';
import 'firebase/firestore';
import _ from 'lodash';
import {
  ORDERS_FETCH_SUCCESS,
  ORDER_FETCH_SUCCESS,
  ORDER_DELETED_SUCCESS,
  ORDERS_RECEIVED_FETCH_SUCCESS,
  PRODUCT_CREATE_ORDER,
  PRODUCT_UPDATE_ORDER,
  ORDERS_FETCH_PENDING } from './types';
import { orderStates } from '../constants/Enum';

export const orderFetchByUserIdAndStoreIdAndState = (storeId, state) => {
  return (dispatch) => {
    dispatch(fetchOrdersPending());
    const user = firebase.auth().currentUser;
    const userId = user ? user.uid : '';  
    firebase.firestore().collection('orders').where('userId', '==', userId).where('state', '==', state).where('storeId', '==', storeId).get()
    .then(snapshot => {
      //Todo filter by userId and state in backend because is not possible in the client
      const docsOrders = snapshot.docs.map(doc => {
        return { ...doc.data(), uid:doc.id }
      });
      dispatch({ type: ORDERS_FETCH_SUCCESS, payload: docsOrders });
    });
  };
};

export const fetchOrdersPending = () =>{
  return (dispatch) => {
    dispatch({type: ORDERS_FETCH_PENDING});
  }
}

export const orderFetchByOrderId = (orderId) => {
  return (dispatch) => {
    firebase.firestore().collection('orders').doc(orderId).get()
    .then(doc => {
      if (doc.exists){
        const order = { ...doc.data() };
        order.uid = orderId;
        dispatch({ type: STORE_FETCH_SUCCESS, payload: order })
      } else {
        console.log("No such document!");
      }
    })
  };
};

export const deleteOrder = (orderId) => {
  return (dispatch) => {
    firebase.firestore().collection('orders').doc(orderId)
    .delete()
    .then(()=> {
      console.info(`Removed order with orderId: ${orderId}`);
      dispatch({ type: ORDER_DELETED_SUCCESS, payload: orderId });
    })
    .catch(error => console.warn('Error at remove the Order', error));
  };
};

export const deleteOrders = async (orders) => {
  const promises = [];
  for (const order of orders) {
    promises.push(firebase.firestore().collection('orders').doc(order.uid)).delete();
  }
  return Promise.all(promises);
}

export const orderCreate = (order) => {
  order.state = orderStates.draft;
  return (dispatch) => {
    const user = firebase.auth().currentUser;
    order.userId = user ? user.uid : '';
    firebase.firestore().collection('orders')
    .add(order)
    .then((doc) => {
      console.info(`Order Created with Id`, doc.id);
      order.uid = doc.id;
      dispatch({ type: PRODUCT_CREATE_ORDER, payload: order });
    })
    .catch(error => {
      console.warn("It was not add the order", error);
    });
  };
};

export const orderUpdate = (orderId, { ...order }) => {
  return (dispatch) => {
    firebase.firestore().collection('orders').doc(orderId)
    .update(order)
    .then(() => {
      console.info(`Updated order, orderId: ${orderId}`);
      dispatch({ type: PRODUCT_UPDATE_ORDER });
    })
    .catch(error => {
      console.warn("Error at update the Order", error);
    });
  };
};
