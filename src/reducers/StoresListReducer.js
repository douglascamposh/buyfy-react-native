import { STORES_FETCH_SUCCESS, STORES_FETCH_PENDING, STORE_CREATE_SUCCESS, STORE_UPDATE_SUCCESS} from '../actions/types';

const INITIAL_STATE = {
  data: [],
  pending: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case STORES_FETCH_SUCCESS:
      return {
        data: action.payload, 
        payload: false
      };
    case STORES_FETCH_PENDING:
      return { ...state, pending: true };
    case STORE_CREATE_SUCCESS: 
      state.data.push(action.payload);
      return { data: [...state.data] };
    case STORE_UPDATE_SUCCESS:
      const i = state.data.findIndex( index => index.uid === action.payload.uid );
      state.data[i] = action.payload;
      return { data: [...state.data] };  
    default:
      return state;
  }
};