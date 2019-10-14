import {
  PRODUCT_CREATE,
  PRODUCT_UPDATE_FORM
} from '../actions/types';

const INITIAL_STATE = {
  name: '',
  description: '',
  price: '',
  imageName: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PRODUCT_CREATE:
      return INITIAL_STATE;
    case PRODUCT_UPDATE_FORM:
      return { ...state, [action.payload.prop]: action.payload.value }
    default:
      return state;
  }
};
