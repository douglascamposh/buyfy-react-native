import { PRODUCT_FETCH_SUCCESS, PRODUCTS_FETCH_PENDING, PRODUCT_CREATE_SUCCESS, PRODUCT_UPDATE_SUCCESS, PRODUCT_DELETED_SUCCESS } from '../actions/types';

const INITIAL_STATE = {
  data: [],
  pending: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PRODUCT_FETCH_SUCCESS:
      return {
        data: action.payload,
        pending: false
      };
    case PRODUCTS_FETCH_PENDING: 
      return { ...state, pending: true };
    case PRODUCT_CREATE_SUCCESS:
      state.data.push(action.payload);
      return { data: [...state.data] };
    case PRODUCT_UPDATE_SUCCESS:
      const i = state.data.findIndex( index => index.uid === action.payload.uid );
      state.data[i] = action.payload;
      return { data: [...state.data] };
    case PRODUCT_DELETED_SUCCESS:
      return { data: state.data.filter(({uid}) => uid !== action.payload) };
    default:
      return state;
  }
};
