import firebase from 'firebase';
import { IMAGE_FETCH_SUCCESS } from './types';

export const imagesFetch = (imagePath) => {
  return (dispatch) => {
    const ref = firebase.storage().ref(imagePath);
    ref.getDownloadURL().then(data => {
      dispatch({type: IMAGE_FETCH_SUCCESS, payload: data})
    })
    .catch( error => {
      console.error("Error at retrive the image: ", error);
    });
  };
};
