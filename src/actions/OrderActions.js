import firebase from 'firebase';
import { ORDER_FETCH_SUCCESS } from './types';

export const ordersFetchByUserId = () => {
  return (dispatch) => {
    firebase.database().ref(`/orders`)
      .on('value', snapshot => {
        dispatch({ type: ORDER_FETCH_SUCCESS, payload: snapshot.val() });
      });
  };
};
