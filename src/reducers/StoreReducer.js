import { STORE_FETCH_SUCCESS, STORE_FETCH_PENDING, STORE_UPDATE_SUCCESS } from '../actions/types';

const INITIAL_STATE = {
  pending: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case STORE_FETCH_SUCCESS:
      return {...state, ...action.payload, pending: false}
    case STORE_FETCH_PENDING:
      return {
        ...state, 
        pending: true
      }
    default:
      return state;
  }
};
