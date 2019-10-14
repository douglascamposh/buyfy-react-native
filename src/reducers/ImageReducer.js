import { IMAGE_FETCH_SUCCESS } from '../actions/types';

const INITIAL_STATE = {
  loading: false,
  image: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case IMAGE_FETCH_SUCCESS:
      return {...state, loading: true, image: action.payload};
    default:
      return state;
  }
};
