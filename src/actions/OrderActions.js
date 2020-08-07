import firebase from 'firebase';
import _ from 'lodash';
import {
  ORDERS_FETCH_SUCCESS,
  ORDER_FETCH_SUCCESS,
  ORDER_DELETED_SUCCESS,
  PRODUCT_CREATE_ORDER,
  PRODUCT_UPDATE_ORDER } from './types';
import { orderStates } from '../constants/Enum';

export const orderFetchByUserIdAndStoreIdAndState = (storeId, state) => {
  return (dispatch) => {
    const user = firebase.auth().currentUser;
    const userId = user ? user.uid : '';
    firebase.database().ref(`/orders`).orderByChild('userId').equalTo(userId)
      .on('value', snapshot => {
        //Todo filter by userId and state in backend because is not possible in the client
        const orders = _.map(snapshot.val(), (val, uid) => {
          return { ...val, uid };
        });
        const filteredOrders = orders.filter(order => order.state === state && order.storeId === storeId);
        const ordersObj = {};
        for (const order of filteredOrders) {
          ordersObj[order.uid] = order;
        }

        dispatch({ type: ORDERS_FETCH_SUCCESS, payload: ordersObj });
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

export const deleteOrders = async (orders) => {
  const promises = [];
  for (const order of orders) {
    promises.push(firebase.database().ref(`/orders/${order.uid}`).set(null));//TODO instead of delete add flag deleted or add state deleted
  }
  return Promise.all(promises);
}

export const orderCreate = (order) => {
  order.state = orderStates.draft;
  return (dispatch) => {
    const user = firebase.auth().currentUser;
    order.userId = user ? user.uid : '';
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
