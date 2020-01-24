import firebase from 'firebase';
import uuid from 'uuid/v4';
import {
  STORE_FETCH_SUCCESS,
  STORES_FETCH_SUCCESS,
  STORE_CREATE,
  STORE_UPDATE_FORM
} from './types';

export const storesFetch = () => {
  return (dispatch) => {
    firebase.database().ref(`/stores`)
    .on('value', snapshot => {
      dispatch({type: STORES_FETCH_SUCCESS, payload: snapshot.val()});
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

const uploadImage = async (image, imageName) => {
  const response = await fetch(image);
  const blob = await response.blob();
  const ref = firebase.storage().ref().child(`images/${imageName}`);
  return ref.put(blob);
}

export const storeUpdateForm = ({prop, value}) => {
  return {
    type: STORE_UPDATE_FORM,
    payload: {prop, value}
  }
};

export const storeFetchById = (storeId) => {
  return (dispatch) => {
    firebase.database().ref(`/stores/${storeId}`)
      .on('value', snapshot => {
        dispatch({ type: STORE_FETCH_SUCCESS, payload: snapshot.val() });
      });
  };
};
