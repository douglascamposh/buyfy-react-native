import firebase  from 'firebase';
import 'firebase/firestore';
import {
  CATEGORIES_STORE_FETCH_SUCCESS,
  CATEGORIES_PRODUCTS_FETCH_SUCCESS,
  CATEGORIES_FETCH_PENDING
} from './types';

export const storeCategoryListFetch = () => {
  return (dispatch) => {
    dispatch({ type: CATEGORIES_FETCH_PENDING });
    firebase.firestore().collection('categories').where("parentId", "==", "0").get()
    .then(snapshot => {
      const categories = snapshot.docs.map(doc => {
        return {...doc.data(), uid: doc.id}
        });
      dispatch({type: CATEGORIES_STORE_FETCH_SUCCESS, payload: categories});
    })
    .catch(error => console.info('a error ocurred in categories Fetch List',error));
  }
}

export const productsCategoryListFetch = (categoryId) => {
  return (dispatch) => {
    dispatch({ type: CATEGORIES_FETCH_PENDING });
    firebase.firestore().collection('categories').where("parentId", "==", categoryId).get()
    .then(snapshot => {
      const categories = snapshot.docs.map(doc => {
        return {...doc.data(), uid: doc.id}
      });
      dispatch({type: CATEGORIES_PRODUCTS_FETCH_SUCCESS, payload: categories});
    })
    .catch(error => console.info('a error ocurred in categories Fetch products categories',error));
  }
}

export const fetchCategoriesListPending = () =>{
  return(dispatch) => {
    dispatch({ type: CATEGORIES_FETCH_PENDING });
  }
}