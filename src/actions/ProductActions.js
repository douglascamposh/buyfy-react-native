import firebase from 'firebase/app';
import 'firebase/firestore';
import uuid from 'uuid/v4';
import {
  PRODUCT_FETCH_SUCCESS,
  PRODUCT_CREATE,
  PRODUCT_UPDATE,
  PRODUCT_UPDATE_FORM,
  PRODUCT_FETCH_PENDING
} from './types';

export const productsFetch = () => {
  return () => {
    firebase.firestore().collection('products').get()
    .then(dispatch => {
      const products = snapshot.docs.map(doc => {
        return { ...doc.data(), uid:doc.id }
      });
      dispatch({type: PRODUCT_FETCH_SUCCESS, payload: products});
    })
  };
};

export const productsFetchByStoreId = (storeId) => {
  return (dispatch) => {
    firebase.firestore().collection('products').where('storeId', '==', storeId).get()
    .then(snapshot => {
      const products = snapshot.docs.map(doc => {
        return { ...doc.data(), uid:doc.id }
      });
      dispatch({ type: PRODUCT_FETCH_SUCCESS, payload: products });    
    })
  };
};

export const productCreate = ({name, description, price, image, storeId}) => {
  return (dispatch) => {
    const imageName = image ? uuid() : '';
    firebase.firestore().collection('products')
    .add({ name, description, price, imageName, storeId })
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
    })
  };
};

export const deleteProduct = (productId) => {
  return () => {
    firebase.firestore().collection('products').doc(productId)
    .delete()
    .then(() => console.log(`Removed product with productId: ${productId}`))
    .catch( error => console.warn("Error at remove the Product", error));
  };
};

export const productUpdate = ({ name, description, price, image, imageName, storeId, uid }) => {
  const newImageName = image ? uuid() : imageName;
  return (dispatch) => {
    firebase.firestore().collection('products').doc(uid)
    .update({ name, description, price: Number(price), imageName: newImageName, storeId })
    .then(() => {
      console.info(`Updated product, productId: ${uid}`);
      uploadImage(image, newImageName)
      .then(() => {
        console.info("image edit uploaded", imageName);
        dispatch({ type: PRODUCT_UPDATE });
      })
      .catch(error => {
        console.warn(`It was not possible upload the new image to the product with productId: ${uid}`, error);
        dispatch({ type: PRODUCT_UPDATE });
      });        
    })
    .catch(error => {
      console.warn("Error at update the Product", error);
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
