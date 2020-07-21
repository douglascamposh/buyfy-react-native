import {
    STORE_CREATE,
    STORE_UPDATE
  } from '../actions/types';
  
  const INITIAL_STATE = {
    name: '',
    description: '',
    imageName: '',
    image: '',
    deliveryTime: '',
    shippingCost: '',
    category: '',
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
    deleted: true
  };
  
  export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case STORE_CREATE:
        return INITIAL_STATE;
      case STORE_UPDATE:
        return { ...INITIAL_STATE };
      default:
        return state;
    }
  };
  