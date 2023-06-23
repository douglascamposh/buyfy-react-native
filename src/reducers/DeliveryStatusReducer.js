import {
    DELIVERY_STATUS_CREATE_SUCCESS,
    DELIVERY_STATUS_UPDATE_SUCCESS
  } from '../actions/types';
  
  const INITIAL_STATE = {
    status: null,
    riderId: null,
    invoiceId: null,
    createdAt: null,
    states: [],
    error: ''
  };
  
  export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case DELIVERY_STATUS_CREATE_SUCCESS:
        return { ...INITIAL_STATE, ...action.payload};
      case DELIVERY_STATUS_UPDATE_SUCCESS:
          return { ...INITIAL_STATE, ...action.payload};
      default:
        return state;
    }
  };
  