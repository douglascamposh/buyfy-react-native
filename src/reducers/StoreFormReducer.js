import {
    STORE_CREATE,
    STORE_UPDATE_FORM
  } from '../actions/types';
  
  const INITIAL_STATE = {
    name: '',
    description: '',
    imageName: ''
  };
  
  export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case STORE_CREATE:
        return INITIAL_STATE;
      case STORE_UPDATE_FORM:
        return { ...state, [action.payload.prop]: action.payload.value }
      default:
        return state;
    }
  };
  