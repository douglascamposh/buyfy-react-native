import {
    ADDRESS_CREATE,
    ADDRESS_UPDATE
  } from '../actions/types';
  
  const INITIAL_STATE = {
    name: '',
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
      default:
        return state;
    }
  };
  