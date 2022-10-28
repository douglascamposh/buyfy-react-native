import {
    DELIVERY_STATUS_CREATE_SUCCESS,
  } from '../actions/types';
  
  const INITIAL_STATE = {
    status: null,
    riderId: null,
    invoiceId: null,
    createdAt: null,
    error: ''
  };
  
  export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case DELIVERY_STATUS_CREATE_SUCCESS:
        return { ...INITIAL_STATE, ...action.payload};
      default:
        return state;
    }
  };
  