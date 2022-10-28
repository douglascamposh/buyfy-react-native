import {
    DELIVERY_STATUS_FETCH_SUCCESS,
    DELIVERY_STATUS_FETCH_PENDING,
  } from '../actions/types';
  
  const INITIAL_STATE = {
    deliveryStatusList: [],
    error: '',
    pending: false,
  };
  
  export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case DELIVERY_STATUS_FETCH_SUCCESS:
        return { ...INITIAL_STATE, deliveryStatusList: [...action.payload], pending: false };
    case DELIVERY_STATUS_FETCH_PENDING:
      return { 
        ...state,
        pending: true
      };
      default:
        return state;
    }
  };
  