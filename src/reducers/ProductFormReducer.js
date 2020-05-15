import {
  PRODUCT_CREATE,
  PRODUCT_UPDATE_FORM,
  PRODUCT_UPDATE
} from '../actions/types';

const INITIAL_STATE = {
  name: '',
  description: '',
  price: '',
  imageName: '',
  image: '',
  storeId: '',
  uid: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PRODUCT_CREATE:
      return INITIAL_STATE;
    case PRODUCT_UPDATE:
      return { ...INITIAL_STATE }
    case PRODUCT_UPDATE_FORM:
      return { ...state, [action.payload.prop]: action.payload.value }
    default:
      return state;
  }
};
