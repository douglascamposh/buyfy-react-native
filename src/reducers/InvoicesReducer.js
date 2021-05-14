import { INVOICES_FETCH_SUCCESS, INVOICES_FETCH_BY_USER_ID_SUCCESS, INVOICE_CREATE_SUCCESS, INVOICE_UPDATE_SUCCESS, INVOICE_RIDER_UPDATE_SUCCESS, INVOICES_FETCH_BY_STORE_ID_SUCCESS, INVOICES_FETCH_BY_STATE_SUCCESS} from '../actions/types';

const INITIAL_STATE = {
  dataCards: [],
  ordersRecived: [],
  ordersRider: [],
  pending: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case INVOICES_FETCH_BY_USER_ID_SUCCESS: 
      return {
        ...state,
        data: action.payload,
        dataCards: action.payload,
        pending: false,
      }
    case INVOICES_FETCH_BY_STORE_ID_SUCCESS:
      return {
        ...state,
        ordersRecived: action.payload,
        pending: false,
      }
    case INVOICES_FETCH_BY_STATE_SUCCESS:
      return {
        ...state,
        ordersRider: action.payload,
        pending: false,
      }
    case INVOICE_CREATE_SUCCESS: 
      return {
        ...state, 
        dataCards: [...state.dataCards, action.payload]
      }
    case INVOICE_UPDATE_SUCCESS: 
    const data = state.ordersRecived.map(invoice => {
      if (invoice.uid === action.payload.uid) {
        return { ...invoice, ...action.payload };
      }
      return invoice;
    });
    return { ...state, ordersRecived:[...data]}
    
    case INVOICE_RIDER_UPDATE_SUCCESS: 
    const dataRider = state.ordersRider.map(invoice => {
      if (invoice.uid === action.payload.uid) {
        return { ...invoice, ...action.payload };
      }
      return invoice;
    });
    return { ...state,  ordersRider: [...dataRider]}
    default:
      return state;
  }
};
