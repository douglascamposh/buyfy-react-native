import { USER_FETCH_SUCCESS, USER_LOGOUT_SUCCESS } from '../actions/types';

const INITIAL_STATE = {
  displayName: '',
  email: '',
  photoURL: '',
  isLoged: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER_FETCH_SUCCESS:
      return {...state, ...action.payload, isLoged: true};
    case USER_LOGOUT_SUCCESS:
      return {...INITIAL_STATE, ...action.payload};
    default:
      return state;
  }
};