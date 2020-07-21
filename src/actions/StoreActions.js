import firebase from 'firebase';
import uuid from 'uuid/v4';
import {
  STORE_FETCH_SUCCESS,
  STORES_FETCH_SUCCESS,
  STORES_FETCH_ADMIN_SUCCESS,
  STORE_CREATE,
  STORE_UPDATE
} from './types';

export const storesFetch = () => {
  return (dispatch) => {
    firebase.database().ref(`/stores`).orderByChild('deleted').equalTo(false)
    .on('value', snapshot => {
      dispatch({type: STORES_FETCH_SUCCESS, payload: snapshot.val()});
    });
  };
};

export const storesByUserIdFetch = () => {
  const user = firebase.auth().currentUser;
  const userId = user ? user.uid : '';
  return (dispatch) => {
    firebase.database().ref(`/stores`).orderByChild('userId').equalTo(userId)
      .on('value', snapshot => {
        dispatch({ type: STORES_FETCH_ADMIN_SUCCESS, payload: snapshot.val() });
      });
  };
};

export const storeCreate = (store) => {
  const { image } = store;
  delete store.image;
  const user = firebase.auth().currentUser;
  const userId = user ? user.uid : '';
  const created_at = updated_at = Date.now();
  return (dispatch) => {
    const imageName = image ? uuid() : '';
    if (image) {
      uploadImage(image, imageName)
        .then(response => {
          console.info("image uploaded", imageName);
        })
        .catch(error => {
          console.warn("It was not possible upload the image", error);
        }).finally(() => {
          firebase.database().ref(`/stores`)
            .push({ ...store, userId, created_at, updated_at })
            .then(() => {
              console.info(`Store Created`);
            })
            .catch(error => {
              console.warn("Error at create the Store", error);
            }).finally(() => dispatch({ type: STORE_CREATE }));
        });
    } else {
      firebase.database().ref(`/stores`)
        .push({ ...store, userId, created_at, updated_at })
        .then(() => {
          console.info(`Store Created`);
        })
        .catch(error => {
          console.warn("Error at create the Store", error);
        }).finally(() => dispatch({ type: STORE_CREATE }));
    }
  };
};

export const storeUpdate = (store) => {
  const { uid, image, imageName } = store;
  delete store.uid;
  delete store.image;
  const newImageName = image ? uuid() : imageName;
  const updated_at = Date.now();
  const user = firebase.auth().currentUser;
  const userId = user ? user.uid : '';
  return (dispatch) => {
    if (image) {
      uploadImage(image, newImageName)
      .then(response => {
        console.info("image uploaded", newImageName);
      })
      .catch(error => {
        console.warn(`It was not possible upload the new image to the store with storeId: ${uid}`, error);
      })
      .finally(() => {
        firebase.database().ref(`/stores/${uid}`)
          .set({ ...store, imageName: newImageName, updated_at, userId })
          .then(() => {
            console.info(`Updated Store, storeId: ${uid}`);
          })
          .catch(error => {
            console.warn("Error at update the Store", error);
          }).finally(() => dispatch({ type: STORE_UPDATE }));
      });
    } else {
      firebase.database().ref(`/stores/${uid}`)
        .set({ ...store, imageName: newImageName, updated_at, userId })
        .then(() => {
          console.info(`Updated Store, storeId: ${uid}`);
        })
        .catch(error => {
          console.warn("Error at update the Store", error);
        }).finally(() => dispatch({ type: STORE_UPDATE }));
    }
  };
};

export const storeUpdateFields = (store) => {
  const {uid} = store;
  delete store.uid;
  const updated_at = Date.now();
  return (dispatch) => {
    firebase.database().ref(`/stores/${uid}`)
      .set({ ...store, updated_at})
      .then(() => {
        console.info(`Updated Store, storeId: ${uid}`);
        dispatch({ type: STORE_UPDATE });
      })
      .catch(error => {
        console.warn("Error at update the Store", error);
      });
  };
};

export const deleteStore = (storeId) => {
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
        const store = { ...snapshot.val() };
        store.uid = storeId;
        dispatch({ type: STORE_FETCH_SUCCESS, payload: store });
      });
  };
};
