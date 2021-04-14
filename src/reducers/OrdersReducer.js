import { ORDERS_FETCH_SUCCESS, ORDERS_FETCH_PENDING } from '../actions/types';

const INITIAL_STATE = {
  pending: true
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
    default:
      return state;
  }
};