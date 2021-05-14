import firebase from 'firebase/app';
import 'firebase/firestore';
import {
  INVOICE_CREATE,
  INVOICE_UPDATE_FORM,
  INVOICES_FETCH_BY_USER_ID_SUCCESS,
  INVOICES_FETCH_SUCCESS,
  INVOICE_FETCH_SUCCESS,
  INVOICE_CREATE_SUCCESS,
  INVOICE_UPDATE_SUCCESS,
  INVOICES_FETCH_BY_STORE_ID_SUCCESS,
  INVOICES_FETCH_BY_STATE_SUCCESS,
  INVOICE_RIDER_UPDATE_SUCCESS
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
      for (let index = 0; index < invoice.orders.length; index++) {
        let orderId = invoice.orders[index].uid
        const orderRef = firebase.firestore().collection('orders').doc(orderId);
        writeBatch.update(orderRef, {state: orderStates.created} ); //Update orders
      }
      writeBatch.commit()
      .then(() => {
        console.log('Successfully executed batch.');
        dispatch({ type: INVOICE_CREATE, payload: { invoiceId } });
        dispatch({ type: INVOICE_CREATE_SUCCESS, payload: invoice });
      })
      .catch((error) => console.log('Batch error', error))
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
  // dispatch({ type: INVOICE_CREATE, payload: { uid } });//Todo revisar para que sirve el dispatch
    dispatch({ type: INVOICE_UPDATE_SUCCESS, payload: invoice, uid });
  }
}

export const invoiceUpdateRiderById = (invoice) => {
  const {uid} = invoice;
  delete invoice.uid;
  return (dispatch) => {
    firebase.firestore().collection('invoices').doc(uid)
    .update(invoice)
    .then(() => {
      console.info(`Invoice Rider updated with id ${uid}`);
    })
    .catch(error => {
      console.warn('The invoice rider was not updated', error);
    });
    dispatch({ type: INVOICE_RIDER_UPDATE_SUCCESS, payload: invoice, uid });
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
      dispatch({ type: INVOICES_FETCH_BY_USER_ID_SUCCESS, payload: docsInvoicesFetchUser });
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
      dispatch({ type: INVOICES_FETCH_BY_STORE_ID_SUCCESS, payload: docsInvoicesFetchStore });
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
      dispatch({ type: INVOICES_FETCH_BY_STATE_SUCCESS, payload: docsInvoicesFetchState });
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
