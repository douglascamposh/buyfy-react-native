import {
    PRODUCT_CREATE_ORDER,
    PRODUCT_UPDATE_ORDER,
    PRODUCT_UPDATE_FORM
  } from '../actions/types';
  
  const INITIAL_STATE = {
    quantity: 1,
    notes: '',
    price: 0
  };
  
  export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case PRODUCT_CREATE_ORDER:
        return INITIAL_STATE;
      case PRODUCT_UPDATE_ORDER:
        return INITIAL_STATE;
      case PRODUCT_UPDATE_FORM:
        return { ...state, [action.payload.prop]: action.payload.value }
      default:
        return state;
    }
  };
  