import { STORE_FETCH_SUCCESS, STORE_FETCH_PENDING, STORE_UPDATE_SUCCESS,  } from '../actions/types';

const INITIAL_STATE = {
  data: [],
  pending: true
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case STORE_FETCH_SUCCESS:
      return {
        ...state,
        data: action.payload,
        pending: false
      };
    case STORE_FETCH_PENDING: 
      return {...state, pending: true};
    case STORE_UPDATE_SUCCESS:
      const data = state.data.map( store => {
        if(store.uid === action.payload.uid){
          return {...store, ...action.payload}
        }
        return store;
      })
      return {...state, data:data};
    default:
      return state;
  }
};
