import {
    STORE_CREATE,
    STORE_UPDATE
  } from '../actions/types';
  
  const INITIAL_STATE = {
    name: '',
    description: '',
    imageName: '',
    image: '',
    address: '',
    deliveryTime: '',
    shippingCost: '',
    category: '',
    uid: ''
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
  