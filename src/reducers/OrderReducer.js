import { ORDER_FETCH_SUCCESS, ORDERS_FETCH_SUCCESS, ORDER_DELETED_SUCCESS } from '../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ORDER_FETCH_SUCCESS:
      return action.payload;
    case ORDERS_FETCH_SUCCESS:
      return action.payload;
    default:
      return state;
  }
};
