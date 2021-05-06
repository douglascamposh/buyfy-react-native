import { INVOICES_FETCH_SUCCESS, INVOICE_CREATE_SUCCESS} from '../actions/types';

const INITIAL_STATE = {
  data: [],
  pending: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case INVOICES_FETCH_SUCCESS:
      return {
        ...state,
        data: action.payload,
        pending: false
      }
    case INVOICE_CREATE_SUCCESS: 
      return {
        ...state, data: [...state.data, action.payload]
      }
    default:
      return state;
  }
};
