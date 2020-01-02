import firebase from 'firebase';
import { INVOICE_CREATE, INVOICE_UPDATE_FORM } from './types';
import _ from 'lodash';
import { orderStates } from '../constants/Enum';

export const invoiceCreate = (invoice) => {
  return (dispatch) => {
    firebase.database().ref(`/invoices`)
      .push(invoice)
      .then((response) => {
        console.info('Invoice Created', response);
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

        dispatch({ type: INVOICE_CREATE });
      })
      .catch(error => {
        console.warn('It was not created the Invoice', error);
      });
  };
};

export const invoiceUpdateForm = ({ prop, value }) => {
  return {
    type: INVOICE_UPDATE_FORM,
    payload: { prop, value }
  }
};
