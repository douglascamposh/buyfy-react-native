import {
  PRODUCT_CREATE
} from '../actions/types';

const INITIAL_STATE = {
  name: '',
  description: '',
  categoryId: '',
  price: '',
  imageName: '',
  image: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
