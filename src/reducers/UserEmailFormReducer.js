import {USER_LOGIN, USER_ERROR_LOGIN, USER_ERROR_SIGN_UP, USER_SIGN_UP, USER_PENDING, USER_LOGOUT_SUCCESS } from '../actions/types';


const INITIAL_STATE = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
  profilePicture: '',
  error: '',
  signUpError: '',
  pending: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER_LOGIN:
      return {
        ...state,
        email: action.payload.email,
        error: action.payload.error, 
        pending: false
      }
    case USER_ERROR_LOGIN:
      return {
        ...state, 
        ...action.payload, 
        pending: false
      }
    case USER_ERROR_SIGN_UP:
      return {
        ...state,
        ...action.payload, 
        pending: false
      }
    case USER_PENDING: 
      return { 
        ...state, 
        error: '', 
        pending: true 
      }
    case USER_SIGN_UP:   
      return {
      ...state,
      firstName: action.payload.firstName,
      lastName: action.payload.lastName,
      signUpError: action.payload.signUpError,
      pending: false
    }
    case USER_LOGOUT_SUCCESS:
      return {
      ...INITIAL_STATE, ...action.payload
    }
    default:
      return state;
  }
};