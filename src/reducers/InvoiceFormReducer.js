import {
  INVOICE_CREATE,
  INVOICE_UPDATE_FORM
} from '../actions/types';

const INITIAL_STATE = {
  addressId: '',
  nit: '',
  orders: {},
  shippingCost: 0
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case INVOICE_CREATE:
      return { ...INITIAL_STATE, ...action.payload};
    case INVOICE_UPDATE_FORM:
      return { ...state, [action.payload.prop]: action.payload.value }
    default:
      return state;
  }
};
