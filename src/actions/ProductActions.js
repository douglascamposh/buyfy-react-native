import firebase from 'firebase';
import uuid from 'uuid/v4';
import {
  PRODUCT_FETCH_SUCCESS,
  PRODUCT_CREATE,
  PRODUCT_UPDATE_FORM,
} from './types';

export const productsFetch = () => {
  return (dispatch) => {
    firebase.database().ref(`/products`)
    .on('value', snapshot => {
      dispatch({type: PRODUCT_FETCH_SUCCESS, payload: snapshot.val()});
    });
  };
};

export const productsFetchByStoreId = (storeId) => {
  return (dispatch) => {
    firebase.database().ref(`/products`).orderByChild('storeId').equalTo(storeId)
    .on('value', snapshot => {
      dispatch({type: PRODUCT_FETCH_SUCCESS, payload: snapshot.val()});
    });
  };
};

export const productCreate = ({name, description, price, image, storeId}) => {
  return (dispatch) => {
    const imageName = image ? uuid() : '';
    firebase.database().ref(`/products`)
    .push({name, description, price, imageName, storeId})
    .then((response) => {
      if(image) {
        uploadImage(image, imageName)
        .then((response) => {
          console.info("image uploaded", imageName);
          dispatch({type: PRODUCT_CREATE});
        })
        .catch(error => {
          console.warn("It was not possible upload the image", error);
          dispatch({type: PRODUCT_CREATE});
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

export const productUpdateForm = ({prop, value}) => {
  return {
    type: PRODUCT_UPDATE_FORM,
    payload: {prop, value}
  }
};
