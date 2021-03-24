import firebase from 'firebase/app';
import 'firebase/firestore';
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
    firebase.firestore().collection('invoices')
    .add(invoice)
    .then(response => {
      const invoiceId = response.id;
      const writeBatch = firebase.firestore().batch();
      dispatch({ type: INVOICE_CREATE, payload: { invoiceId } });
      for (let index = 0; index < invoice.orders.length; index++) {
        let orderId = invoice.orders[index].uid
        const orderRef = firebase.firestore().collection('orders').doc(orderId);
        writeBatch.update(orderRef, {state: orderStates.created} ); //Update orders
      }
      writeBatch.commit()
      .then(() => console.log('Successfully executed batch.'))
      .catch((error) => console.log('Batch error', error))
      dispatch({ type: INVOICE_CREATE, payload: { invoiceId } });
    })
    .catch(error => console.warn('It was not created the Invoice', error))
  };
};

export const invoiceUpdateById = (invoice) => {
  const {uid} = invoice;
  delete invoice.uid;
  return (dispatch) => {
    firebase.firestore().collection('invoices').doc(uid)
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
    firebase.firestore().collection('invoices').where('userId', '==', userId).get()
    .then(snapshot => {
      const docsInvoicesFetchUser = snapshot.docs.map(doc => {
        return { ...doc.data(), uid:doc.id }
      });
      dispatch({ type: INVOICES_FETCH_SUCCESS, payload: docsInvoicesFetchUser });
    })
  };
};

export const invoiceFetchByStoreId = (storeId) => {
  return (dispatch) => {
    firebase.firestore().collection('invoices').where('storeId', '==', storeId).get()
    .then(snapshot => {
      const docsInvoicesFetchStore = snapshot.docs.map(doc => {
        return { ...doc.data(), uid:doc.id }
      })
      dispatch({ type: INVOICES_FETCH_SUCCESS, payload: docsInvoicesFetchStore });
    })
  };
};

export const invoiceFetchByState = (state) => {
  return (dispatch) => {
    firebase.firestore().collection('invoices').where('state', '==', state).get()
    .then(snapshot => {
      const docsInvoicesFetchState = snapshot.docs.map(doc => {
        return { ...doc.data(), uid:doc.id }
      })
      dispatch({ type: INVOICES_FETCH_SUCCESS, payload: docsInvoicesFetchState });
    })
  };
};

export const invoiceFetchById = (invoiceId) => {
  return (dispatch) => {
    firebase.firestore().collection('invoices').doc(invoiceId).get()
    .then(doc => {
      if (doc.exists){
        const invoice = { ...doc.data() };
        invoice.uid = invoiceId;
        dispatch({ type: INVOICE_FETCH_SUCCESS, payload: invoice })
      } else {
        console.log("No such document!");
      }
    })
  };
};

export const invoiceUpdateForm = ({ prop, value }) => {
  return {
    type: INVOICE_UPDATE_FORM,
    payload: { prop, value }
  }
};
