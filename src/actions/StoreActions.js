import firebase from 'firebase';
import uuid from 'uuid/v4';
import { STORE_FETCH_SUCCESS, STORE_CREATE, STORE_UPDATE_FORM } from './types';

export const storesFetch = () => {
  return (dispatch) => {
    firebase.database().ref(`/stores`)
    .on('value', snapshot => {
      dispatch({type: STORE_FETCH_SUCCESS, payload: snapshot.val()});
    });
  };
};

export const storeCreate = ({name, description, image}) => {
  return (dispatch) => {
    const imageName = image ? uuid() : '';
    firebase.database().ref(`/stores`)
    .push({name, description, imageName})
    .then((response) => {
      if(image) {
        uploadImage(image, imageName)
        .then(response => {
          console.info("image uploaded", imageName);
          dispatch({type: STORE_CREATE});
        })
        .catch(error => {
          console.warn("It was not possible upload the image", error);
          dispatch({type: STORE_CREATE});
        });
      }
    });
  };
};

export const storeUpdateForm = ({prop, value}) => {
  return {
    type: STORE_UPDATE_FORM,
    payload: {prop, value}
  }
};
