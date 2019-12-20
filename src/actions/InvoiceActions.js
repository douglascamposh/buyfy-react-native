import firebase from 'firebase';
import { INVOICE_CREATE, INVOICE_UPDATE_FORM } from './types';

export const invoiceCreate = (invoice) => {
  return (dispatch) => {
    firebase.database().ref(`/invoices`)
      .push(invoice)
      .then(() => {
        console.info(`Invoice Created`);
        dispatch({ type: INVOICE_CREATE });
      })
      .catch(error => {
        console.warn("It was not created the Invoice", error);
      });
  };
};

export const invoiceUpdateForm = ({ prop, value }) => {
  return {
    type: INVOICE_UPDATE_FORM,
    payload: { prop, value }
  }
};
