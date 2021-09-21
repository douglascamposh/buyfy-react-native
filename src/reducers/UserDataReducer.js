import { USER_FETCH_SUCCESS, USER_DATA_UPDATE, USER_ERROR_DATA_UPDATE, USER_LOGOUT_SUCCESS } from '../actions/types';

const INITIAL_STATE = {
  firstName: '',
  lastName: '',
  email: '',
  profilePicture: '',
  isLoged: false,
  error: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER_FETCH_SUCCESS:
      return {
        ...state, 
        ...action.payload,
      };
    case USER_DATA_UPDATE:
      return {
        ...state, 
        ...action.payload, 
        isLoged: true
      }
      case USER_ERROR_DATA_UPDATE:
        return {
          ...state, 
          ...action.payload
        }
    case USER_LOGOUT_SUCCESS:
      return {
        ...INITIAL_STATE, 
        ...action.payload
      };
    default:
      return state;
  }
};