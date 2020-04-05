import {
    ADDRESS_CREATE,
    ADDRESS_UPDATE,
    ADDRESS_UPDATE_FORM
  } from '../actions/types';
  
  const INITIAL_STATE = {
    street: '',
    numberStreet: '',
    departmentNumber: '',
    city: '',
    town: '',
    streetReference: '',
    phone: '',
    userId: '',
    uid: ''
  };
  
  export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case ADDRESS_CREATE:
        return { ...INITIAL_STATE }
      case ADDRESS_UPDATE:
        return { ...INITIAL_STATE }
      case ADDRESS_UPDATE_FORM:
        return { ...state, [action.payload.prop]: action.payload.value }
      default:
        return state;
    }
  };
  