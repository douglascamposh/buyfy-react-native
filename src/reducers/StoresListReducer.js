import { STORES_FETCH_SUCCESS, STORES_FETCH_PENDING, STORE_CREATE_SUCCESS, STORE_UPDATE_SUCCESS} from '../actions/types';

const INITIAL_STATE = {
  data: [],
  pending: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case STORES_FETCH_SUCCESS:
      return {
        ...state,
        data: action.payload, 
        payload: false
      };
    case STORES_FETCH_PENDING:
      return { ...state, pending: true };
    case STORE_CREATE_SUCCESS: 
      return{
        ...state, data: [ ...state.data, action.payload ]
      }
    case STORE_UPDATE_SUCCESS:
      const data = state.data.map(store => {
        if (store.uid === action.payload.uid) {
          return { ...store, ...action.payload };
        }
        return store;
      });
      return { ...state, data: data };
    default:
      return state;
  }
};
