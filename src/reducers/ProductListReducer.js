import { PRODUCT_FETCH_SUCCESS, PRODUCTS_FETCH_PENDING, PRODUCT_CREATE_SUCCESS, PRODUCT_UPDATE_SUCCESS, PRODUCT_DELETED_SUCCESS } from '../actions/types';

const INITIAL_STATE = {
  data: [],
  pending: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PRODUCT_FETCH_SUCCESS:
      return {
        ...state,
        data: action.payload,
        pending: false
      };
    case PRODUCTS_FETCH_PENDING: 
      return { ...state, pending: true };
    case PRODUCT_CREATE_SUCCESS:
      return {
        ...state, data: [...state.data, action.payload]
      }
    case PRODUCT_UPDATE_SUCCESS:
      const data = state.data.map( product => {
        if(product.uid === action.payload.uid){
          return {...product, ...action.payload}
        }
        return product;
      })
      return {...state, data:data};
    case PRODUCT_DELETED_SUCCESS:
        return {
          ...state, data: state.data.filter(({uid}) => uid !== action.payload)
        }
    default:
      return state;
  }
};
