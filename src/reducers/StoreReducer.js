import { STORE_FETCH_SUCCESS, STORE_FETCH_PENDING  } from '../actions/types';

const INITIAL_STATE = {
  pending: true
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case STORE_FETCH_SUCCESS:
      return {...action.payload, pending: false};
    case STORE_FETCH_PENDING: 
      return {...state, pending: true};
    default:
      return state;
  }
};
