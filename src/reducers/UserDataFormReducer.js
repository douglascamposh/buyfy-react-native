import { USER_DATA_UPDATE } from '../actions/types';

const INITIAL_STATE = {
  firstName: '',
  lastName: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER_DATA_UPDATE:
      return { ...INITIAL_STATE }
    default:
      return state;
  }
};