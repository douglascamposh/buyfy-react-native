import { ADDRESS_FETCH_SUCCESS, ADDRESS_FETCH_PENDING, ADDRESS_CREATE_SUCCESS, ADDRESS_UPDATE_SUCCESS, ADDRESS_DELETED_SUCCESS } from '../actions/types';

const INITIAL_STATE = {
  data: [],
  pending: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADDRESS_FETCH_SUCCESS:
      return { 
        ...state,
        data: action.payload,
        pending: false
      };
    case ADDRESS_FETCH_PENDING:
      return { 
        ...state,
        pending: true
      };  
    case ADDRESS_CREATE_SUCCESS: 
      return {...state, data: [...state.data, action.payload] }
    case ADDRESS_UPDATE_SUCCESS: 
    const data = state.data.map( address => {
      if(address.uid === action.payload.uid){
        return {...address, ...action.payload}
      }
      return address;
    })
    return {...state, data:data};
    case ADDRESS_DELETED_SUCCESS: 
      return { ...state, data: state.data.filter(({uid}) => uid !== action.payload) };  
    default:
      return state;
  }
};
