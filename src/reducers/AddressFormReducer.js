import {
  ADDRESS_CREATE_FORM
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
    default:
      return state;
  }
};