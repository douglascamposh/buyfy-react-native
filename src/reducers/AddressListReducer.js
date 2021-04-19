import { ADDRESS_FETCH_SUCCESS, ADDRESS_FETCH_PENDING, ADDRESS_CREATE_SUCCESS, ADDRESS_UPDATE_SUCCESS, ADDRESS_DELETED_SUCCESS } from '../actions/types';

const INITIAL_STATE = {
  data: [],
  pending: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADDRESS_FETCH_SUCCESS:
      return { 
        data: action.payload,
        pending: false
      };
    case ADDRESS_FETCH_PENDING:
      return { 
        ...state,
        pending: true
      };  
    case ADDRESS_CREATE_SUCCESS: 
      state.data.push(action.payload);
      return { data: [...state.data] };
    case ADDRESS_UPDATE_SUCCESS: 
      const i = state.data.findIndex((index) => index.uid === action.payload.uid);
      state.data[i] = action.payload;
      return { data: [...state.data] };
    case ADDRESS_DELETED_SUCCESS: 
      return { data: state.data.filter(({uid}) => uid !== action.payload) };  
    default:
      return state;
  }
};
