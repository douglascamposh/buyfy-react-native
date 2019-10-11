import firebase from 'firebase';
import { PRODUCT_FETCH_SUCCESS } from './types';

export const productsFetch = () => {
  return (dispatch) => {
    firebase.database().ref(`/products`)
    .on('value', snapshot => {
      dispatch({type: PRODUCT_FETCH_SUCCESS, payload: snapshot.val()});
    });
  };
};
