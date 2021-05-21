import firebase from 'firebase/app';
import 'firebase/firestore';
import uuid from 'uuid/v4';
import {
  PRODUCT_FETCH_SUCCESS,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FORM,
  PRODUCTS_FETCH_PENDING,
  PRODUCT_DELETED_SUCCESS,
  PRODUCT_RESET_VALUES_FORM_ORDER
} from './types';

export const productsFetch = () => {
  return () => {
    firebase.firestore().collection('products').get()
    .then(dispatch => {
      const products = snapshot.docs.map(doc => {
        return { ...doc.data(), uid:doc.id }
      });
      dispatch({ type: PRODUCT_FETCH_SUCCESS, payload: products });
    })
    .catch(error => console.info('a error ocurred in products fetch list',error));
  };
};

export const productsFetchByStoreId = (storeId) => {
  return (dispatch) => {
    dispatch({type: PRODUCTS_FETCH_PENDING});
    firebase.firestore().collection('products').where('storeId', '==', storeId).get()
    .then(snapshot => {
      const products = snapshot.docs.map(doc => {
        return { ...doc.data(), uid:doc.id }
      });
      dispatch({ type: PRODUCT_FETCH_SUCCESS, payload: products });    
    })
    .catch(error => console.info('a error ocurred in products fetch by storeId list ',error));
  };
};

export const productCreate = (product) => {
  const { image } = product;
  delete product.image;
  return (dispatch) => {
    uploadImage(image, uuid())
      .then((imageResponse) => {
        console.info("image uploaded", imageResponse.name);
        product.imageUri = imageResponse.uri;
        product.imageName = imageResponse.name;
      })
      .catch(error => {
        console.info(`It was not possible upload the image to the product`, error);
      })
      .finally(() => {
        firebase.firestore().collection('products')
          .add({ ...product })
          .then(() => {
            console.log('product created', product)
            dispatch({ type: PRODUCT_CREATE_SUCCESS, payload: {...product} });
          }).catch(error => {
            console.warn("It was not possible create the product", error); //TODO add dispatch when occurs an error
          });
      });
  };
};

export const deleteProduct = (productId) => {
  return (dispatch) => {
    firebase.firestore().collection('products').doc(productId)
    .delete()
    .then(() => {
      console.log(`Removed product with productId: ${productId}`);
      dispatch({type: PRODUCT_DELETED_SUCCESS, payload: productId});
    })
    .catch( error => console.warn("Error at remove the Product", error));
  };
};

export const productUpdate = (product) => {
  const { uid, image, price } = product;
  product.price = Number(price);
  delete product.uid;
  delete product.image;
  return (dispatch) => {
    uploadImage(image, uuid())
      .then((imageResponse) => {
        console.info("image edit uploaded", imageResponse.name);
        product.imageUri = imageResponse.uri;
        product.imageName = imageResponse.name;
      })
      .catch(error => {
        console.info(`It was not possible upload the new image to the product with productId: ${uid}`, error);
      })
      .finally(() => {
        firebase.firestore().collection('products').doc(uid)
          .update({ ...product })
          .then(() => {
            console.info(`Updated product, productId: ${uid}`);
            dispatch({ type: PRODUCT_UPDATE_SUCCESS, payload: { ...product,uid } });
          })
          .catch(error => {
            console.warn("Error at update the Product", error);
          });
      });
  };
};

const uploadImage = async (image, imageName) => {
  if (image) {
    const response = await fetch(image);
    const blob = await response.blob();
    const ref = firebase.storage().ref().child(`images/${imageName}`);
    const snapshot = await ref.put(blob);
    const uri = await snapshot.ref.getDownloadURL();
    return { name: imageName, uri };
  }
  throw new Error('Image file is null');
};

export const productInitialValuesForm = () => {
  return (dispatch)=> {
    dispatch({ type: PRODUCT_RESET_VALUES_FORM_ORDER })
  }
};
export const productUpdateForm = ({prop, value}) => {
  return (dispatch)=> {
    dispatch({ type: PRODUCT_UPDATE_FORM, payload: {prop, value} })
  }
};

export const fetchProductsListPending = () => {
  return (dispatch) => {
    dispatch({ type: PRODUCTS_FETCH_PENDING })
  }
}
