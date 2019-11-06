import firebase from 'firebase';
import uuid from 'uuid/v4';
import { STORE_FETCH_SUCCESS } from './types';

export const storesFetch = () => {
  return (dispatch) => {
    firebase.database().ref(`/stores`)
    .on('value', snapshot => {
      dispatch({type: STORE_FETCH_SUCCESS, payload: snapshot.val()});
    });
  };
};
