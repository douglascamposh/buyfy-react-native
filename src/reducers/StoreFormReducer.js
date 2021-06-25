import {
    STORE_CREATE
  } from '../actions/types';
  
  const INITIAL_STATE = {
    name: '',
    description: '',
    imageName: '',
    image: '',
    logo: '',
    logoName: '',
    deliveryTime: '',
    shippingCost: '',
    uid: '',
    minimumCost: '',
    street: '',
    numberStreet: '',
    departmentNumber: '',
    city: '',
    town: '',
    streetReference: '',
    phone: '',
    latitude: '',
    longitude: '',
    userId: '',
    deleted: false
  };

  export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      default:
        return state;
    }
  };
  