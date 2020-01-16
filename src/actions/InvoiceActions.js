import firebase from 'firebase';
import { INVOICE_CREATE, INVOICE_UPDATE_FORM, INVOICE_FETCH_SUCCESS } from './types';
import _ from 'lodash';
import { orderStates, invoiceStates } from '../constants/Enum';

export const invoiceCreate = (invoice) => {
  return (dispatch) => {
    invoice.created_at = Date.now();
    invoice.state = invoiceStates.created;
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
        console.log("entra aqui????")
        dispatch({ type: INVOICE_CREATE, payload: { invoiceId } });
      })
      .catch(error => {
        console.warn('It was not created the Invoice', error);
      });
  };
};

export const invoiceFetchByUserId = () => {
  return (dispatch) => {
    firebase.database().ref(`/invoices`)
      .on('value', snapshot => {
        dispatch({ type: INVOICE_FETCH_SUCCESS, payload: snapshot.val() });
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
