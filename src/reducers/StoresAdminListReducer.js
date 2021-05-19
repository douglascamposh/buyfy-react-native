import { STORES_FETCH_ADMIN_SUCCESS, STORES_FETCH_PENDING, STORE_CREATE_SUCCESS, STORE_UPDATE_SUCCESS, STORE_DISABLE_ENABLE_SUCCESS } from '../actions/types';

const INITIAL_STATE = {
  data: [],
  pending: false 
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case STORES_FETCH_ADMIN_SUCCESS:
      return {
        ...state,
        data: action.payload,
        pending: false
      }
    case STORES_FETCH_PENDING:
      return {
        ...state,
        pending: true
      }
    case STORE_CREATE_SUCCESS: 
      return { ...state, data: [...state.data, action.payload] };
    case STORE_UPDATE_SUCCESS:
      const data = state.data.map(store => {
        if (store.uid === action.payload.uid) {
          return { ...store, ...action.payload };
        }
        return store;
      });
      return { ...state, data: data };
      case STORE_DISABLE_ENABLE_SUCCESS:
        const dataDisableEnable = state.data.map(store => {
          if (store.uid === action.payload.uid) {
            return { ...store, deleted: !store.deleted };
          }
          return store;
        });
        return { ...state, data: dataDisableEnable };
        
    default:
      return state;
  }
};
