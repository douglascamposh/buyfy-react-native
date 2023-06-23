import {
    INVOICE_FETCH_RIDER_LOADING,
    INVOICE_FETCH_BY_STATE_RIDER_SUCCESS,
    INVOICE_FETCH_BY_STATE_RIDER_ERROR
  } from '../actions/types';
  
  const INITIAL_STATE = {
    loading: false,
    invoice: null,
		error: null,
  };
  
  export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
			case INVOICE_FETCH_RIDER_LOADING:
				return { ...state, loading: true };
      case INVOICE_FETCH_BY_STATE_RIDER_SUCCESS:
        return {
          ...state,
          invoice: {...action.payload},
          loading: false,
        }
			case INVOICE_FETCH_BY_STATE_RIDER_ERROR:
				return { ...state, error: action.payload, loading: false };
      default:
        return state;
    }
  };
  