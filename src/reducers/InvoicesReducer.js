import { INVOICES_FETCH_SUCCESS, INVOICE_CREATE_SUCCESS, INVOICE_UPDATE_SUCCESS} from '../actions/types';

const INITIAL_STATE = {
  data: [],
  pending: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case INVOICES_FETCH_SUCCESS:
      return {
        ...state,
        data: action.payload,
        pending: false,
        order: null
      }
    case INVOICE_CREATE_SUCCESS: 
      return {
        ...state, data: [...state.data, action.payload]
      }
    case INVOICE_UPDATE_SUCCESS: 
    const data = state.data.map(invoice => {
      if (invoice.uid === action.payload.uid) {
        return { ...invoice, ...action.payload };
      }
      return invoice;
    });
    return { ...state, data: data, order: action.payload }
    default:
      return state;
  }
};
