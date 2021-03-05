import firebase from 'firebase';
import {
  INVOICE_CREATE,
  INVOICE_UPDATE_FORM,
  INVOICES_FETCH_SUCCESS,
  INVOICE_FETCH_SUCCESS
} from './types';
import _ from 'lodash';
import { orderStates, invoiceStates } from '../constants/Enum';

export const invoiceCreate = (invoice) => {
  return (dispatch) => {
    const user = firebase.auth().currentUser;
    invoice.userId = user ? user.uid : '';
    invoice.created_at = Date.now();
    invoice.state = invoiceStates.created;
    // console.log("shippingCost", invoice.shippingCost);
    firebase.database().ref(`/invoices`)
      .push(invoice)
      .then((response) => {
        console.info('Invoice Created', response);
        const invoiceId = _.last(String(response).split('/'));
        const orders = {};
        for (const key in invoice.orders) {
          orders[`${key}/state`] = orderStates.created;
        }
        firebase.database().ref(`/orders`)
          .update(orders)
          .then(() => {
            console.info('Orders updated');
          })
          .catch(error => {
            console.warn('The orders was not updated', error);
          });;
        dispatch({ type: INVOICE_CREATE, payload: { invoiceId } });
      })
      .catch(error => {
        console.warn('It was not created the Invoice', error);
      });
  };
};

export const invoiceUpdateById = (invoice) => {
  const {uid} = invoice;
  delete invoice.uid;
  return (dispatch) => {
    firebase.database().ref(`/invoices/${uid}`)
      .update(invoice)
      .then(() => {
        console.info(`Invoice updated with id ${uid}`);
      })
      .catch(error => {
        console.warn('The invoice was not updated', error);
      });
    dispatch({ type: INVOICE_CREATE, payload: { uid } });//Todo revisar para que sirve el dispatch
  }
}

export const invoiceFetchByUserId = () => {
  const user = firebase.auth().currentUser;
  const userId = user ? user.uid : '';
  return (dispatch) => {
    firebase.database().ref(`/invoices`).orderByChild('userId').equalTo(userId)
      .on('value', snapshot => {
        dispatch({ type: INVOICES_FETCH_SUCCESS, payload: snapshot.val() });
      });
  };
};

export const invoiceFetchByStoreId = (storeId) => {
  return (dispatch) => {
    firebase.database().ref(`/invoices`).orderByChild('storeId').equalTo(storeId)
      .on('value', snapshot => {
        dispatch({ type: INVOICES_FETCH_SUCCESS, payload: snapshot.val() });
      });
  };
};

export const invoiceFetchByState = (state) => {
  return (dispatch) => {
    firebase.database().ref(`/invoices`).orderByChild('state').equalTo(state)
      .on('value', snapshot => {
        dispatch({ type: INVOICES_FETCH_SUCCESS, payload: snapshot.val() });
      });
  };
};

export const invoiceFetchById = (invoiceId) => {
  return (dispatch) => {
    firebase.database().ref(`/invoices/${invoiceId}`)
      .on('value', snapshot => {
        dispatch({ type: INVOICE_FETCH_SUCCESS, payload: snapshot.val() });
      });
  };
};

export const invoiceUpdateForm = ({ prop, value }) => {
  return {
    type: INVOICE_UPDATE_FORM,
    payload: { prop, value }
  }
};
