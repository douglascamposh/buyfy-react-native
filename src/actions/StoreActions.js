import firebase from 'firebase';
import uuid from 'uuid/v4';
import {
  STORE_FETCH_SUCCESS,
  STORES_FETCH_SUCCESS,
  STORE_CREATE,
  STORE_UPDATE
} from './types';

export const storesFetch = () => {
  return (dispatch) => {
    firebase.database().ref(`/stores`)
    .on('value', snapshot => {
      dispatch({type: STORES_FETCH_SUCCESS, payload: snapshot.val()});
    });
  };
};

export const storeCreate = ({ name, description, address, deliveryTime, shippingCost, category, image }) => {
  return (dispatch) => {
    const imageName = image ? uuid() : '';
    firebase.database().ref(`/stores`)
      .push({ name, description, address, deliveryTime, shippingCost, category, imageName})
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

export const storeUpdate = ({ uid, name, description, address, deliveryTime, shippingCost, category, image, imageName }) => {
  const newImageName = image ? uuid() : imageName;
  return (dispatch) => {
    firebase.database().ref(`/stores/${uid}`) //TODO: Verify if is better upload the image first.
      .set({ name, description, address, deliveryTime, shippingCost, category, imageName: newImageName })
      .then(() => {
        console.info(`Updated Store, storeId: ${uid}`);
        if (image) {
          uploadImage(image, imageName)
            .then(response => {
              console.info("image uploaded", imageName);
              dispatch({ type: STORE_UPDATE });
            })
            .catch(error => {
              console.warn(`It was not possible upload the new image to the store with storeId: ${uid}`, error);
              dispatch({ type: STORE_UPDATE });
            });
        }
      })
      .catch(error => {
        console.warn("Error at update the Store", error);
      });
  };
};

export const deleteStore = (storeId) => { //TODO just update a delete field instead of delete
  return (dispatch) => {
    firebase.database().ref(`/stores/${storeId}`)
      .set(null)
      .then(() => {
        console.info(`Removed store with storeId: ${storeId}`);
      })
      .catch(error => {
        console.warn("Error at remove the Product", error);
      });
  };
};

const uploadImage = async (image, imageName) => {
  const response = await fetch(image);
  const blob = await response.blob();
  const ref = firebase.storage().ref().child(`images/${imageName}`);
  return ref.put(blob);
}

export const storeFetchById = (storeId) => {
  return (dispatch) => {
    firebase.database().ref(`/stores/${storeId}`)
      .on('value', snapshot => {
        dispatch({ type: STORE_FETCH_SUCCESS, payload: snapshot.val() });
      });
  };
};
