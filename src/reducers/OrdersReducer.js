import {
  ORDERS_FETCH_SUCCESS,
  ORDERS_FETCH_PENDING,
  PRODUCT_CREATE_ORDER,
  ORDER_DELETED_SUCCESS
 } from '../actions/types';

const INITIAL_STATE = {
  data: [],
  pending: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ORDERS_FETCH_SUCCESS:
      return { 
        data: action.payload,
        pending: false
      };
    case ORDERS_FETCH_PENDING:
      return { 
        ...state,
        pending: true
      };
    case PRODUCT_CREATE_ORDER:
      state.data.push(action.payload);
      return { data: [...state.data] };
    case ORDER_DELETED_SUCCESS:
      return { data: state.data.filter(({uid}) => uid !== action.payload) };
    default:
      return state;
  }
};