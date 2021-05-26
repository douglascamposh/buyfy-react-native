import firebase from 'firebase/app';
import 'firebase/firestore';
import _ from 'lodash';
import uuid from 'uuid/v4';
import {
  STORE_FETCH_SUCCESS,
  STORES_FETCH_SUCCESS,
  STORES_FETCH_ADMIN_SUCCESS,
  STORE_CREATE_SUCCESS,
  STORE_UPDATE_SUCCESS,
  STORE_DISABLE_ENABLE_SUCCESS,
  STORE_FETCH_PENDING,
  STORES_FETCH_PENDING,
  STORES_BY_USER_FETCH_PENDING
} from './types';

export const storesFetch = () => {
  return (dispatch) => {
    dispatch({ type: STORES_FETCH_PENDING });
    firebase.firestore().collection('stores').where('deleted', '==', false).get()
    .then(snapshot => {
      const stores = snapshot.docs.map(doc => {
        return { ...doc.data(), uid: doc.id }
      });
      dispatch({ type: STORES_FETCH_SUCCESS, payload: stores });    
    })
    .catch(error => console.info('a error ocurred in stores Fetch List',error));
  };
};

export const storesByUserIdFetch = () => {
  const user = firebase.auth().currentUser;
  const userId = user ? user.uid : '';
  return (dispatch) => {
    dispatch({ type: STORES_BY_USER_FETCH_PENDING });
    firebase.firestore().collection('stores').where('userId','==', userId).get()
    .then(snapshot => {
      const stores = snapshot.docs.map(doc => {
        return { ...doc.data(), uid: doc.id }
      });
      dispatch({ type: STORES_FETCH_ADMIN_SUCCESS, payload: stores });    
    })
    .catch(error => console.info('a error ocurred in stores by userId Fetch List',error));
  }; 
};

export const fetchStoresListPending = () => {
  return (dispatch) => {
    dispatch({ type: STORES_FETCH_PENDING });
  }
}

export const fetchStorePending = () => {
  return (dispatch) => {
    dispatch({ type: STORE_FETCH_PENDING });
  }
}

export const storeCreate = (store) => {
  const { image, logo } = store;
  delete store.image;
  delete store.logo;
  const user = firebase.auth().currentUser;
  store.userId = user ? user.uid : '';
  store.created_at = Date.now();
  store.updated_at = Date.now();
  return (dispatch) => {
    const images = [];
    image ? images.push({ name: uuid(), image: image}) : null;
    logo ? images.push({ name: uuid(), image: logo }) : null;
    
    uploadImages(images)
      .then(imagesResponse => {
        if (image) {
          store.imageName = imagesResponse[0].name;
          store.imageUri = imagesResponse[0].uri;
        }
        if (logo) {
          store.logoName = [...imagesResponse].pop().name;
          store.logoUri = [...imagesResponse].pop().uri;
        }
      })
      .catch(error => {
        console.warn(`It was not possible upload the new image to the store with storeId: ${uid}`, error);
      })
      .finally(() => {
        firebase.firestore().collection('stores')
          .add({ ...store, deleted: false })
          .then(() => {
            console.info(`Store Created`);
            dispatch({ type: STORE_CREATE_SUCCESS, payload: store })
          })
          .catch(error => {
            console.warn("Error at create the Store", error); //TODO: add dispatch to display errors
          })
      });
  };
};

export const storeUpdate = (store) => {
  const { uid, image, logo } = store;

  delete store.uid;
  delete store.image;
  delete store.logo;
  
  const images = [];
  image ? images.push({ name: uuid(), image: image }) : null;
  logo ? images.push({ name: uuid(), image: logo }) : null;
  
  const user = firebase.auth().currentUser;
  store.userId = user ? user.uid : '';
  store.updated_at = Date.now();
  return (dispatch) => {
    uploadImages(images)
    .then(imagesResponse => {
      if(image) {
        store.imageName = imagesResponse[0].name;
        store.imageUri = imagesResponse[0].uri;
      }
      if(logo) {
        store.logoName = [...imagesResponse].pop().name;
        store.logoUri = [...imagesResponse].pop().uri;
      }
      console.info(`Image was uploaded storeId: ${uid}`);
    })
    .catch(error => {
      console.warn(`It was not possible upload the new image to the store with storeId: ${uid}`, error);
    })
    .finally(() => {
      firebase.firestore().collection('stores').doc(uid)
        .update({ ...store })
        .then(() => {
          console.info(`Updated Store, storeId: ${uid}`);
          dispatch({ type: STORE_UPDATE_SUCCESS, payload: { ...store, uid } });
        })
        .catch(error => {
          console.log(`error at updated Store, storeId: ${uid}`, error);//TODO: add dispatch to display errors
        });
    });
  };
};

export const storeUpdateFields = (store) => {
  const {uid} = store;
  delete store.uid;
  const updated_at = Date.now();
  return (dispatch) => {
    firebase.firestore().collection('stores').doc(uid)
    .update({ ...store, updated_at })
    .then(() => {
      console.info(`Updated field Store, storeId: ${uid}`);
      dispatch({ type: STORE_UPDATE_SUCCESS, payload: {...store, uid} });
    })
    .catch(error => {
      console.warn("Error at update the field Store", error);
    });
  };
};

export const disableEnableStore = (store) => {
  const { uid, deleted } = store;
  const updated_at = Date.now();
  return (dispatch) => {
    firebase.firestore().collection('stores').doc(uid)
    .update({updated_at, deleted })
    .then(() => {
      deleted? console.info(`disabled field Store, storeId: ${uid}`): console.info(`enabled field Store, storeId: ${uid}`);    
      dispatch({type: STORE_DISABLE_ENABLE_SUCCESS, payload: {uid, deleted}});
    })
    .catch(error => {
      console.warn("Error at delete the field Store", error);
    });
  };
};

const uploadImages = async (images) => {
  const promises = [];
  for(const item of images) {
    promises.push(uploadImage(item.image, item.name));
  }
  return Promise.all(promises);
}

const uploadImage = async (image, imageName) => {
  const response = await fetch(image);
  const blob = await response.blob();
  const ref = firebase.storage().ref().child(`images/${imageName}`);
  const snapshot = await ref.put(blob);
  const uri = await snapshot.ref.getDownloadURL();
  return {name: imageName, uri};
}

export const storeFetchById = (storeId) => {
  return (dispatch) => {
    dispatch({ type: STORE_FETCH_PENDING });
    firebase.firestore().collection('stores').doc(storeId).get()
    .then(doc => {
      if (doc.exists){
        const store = { ...doc.data() };
        store.uid = storeId;
        dispatch({ type: STORE_FETCH_SUCCESS, payload: store })
      } else {
        console.log("No such document!");
      }
    }).catch(error => console.log("Error getting document:", error))
  }
};
