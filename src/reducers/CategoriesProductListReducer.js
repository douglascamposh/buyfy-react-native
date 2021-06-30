import {CATEGORIES_PRODUCTS_FETCH_SUCCESS, CATEGORIES_FETCH_PENDING} from '../actions/types';

const INITIAL_STATE = {
  data: [],
  pending: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CATEGORIES_PRODUCTS_FETCH_SUCCESS:
      return {
        ...state,
        data: [...action.payload],
        pending: false
      }
    case CATEGORIES_FETCH_PENDING:
      return {
        ...state,
        pending: true
      }
    default:
      return state;
  }
}