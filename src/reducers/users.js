import * as types from '../actions/constants/action-types';

const users = (state = [], data) => {
  switch(data.type) {
    case types.USER_LIST:
      return data.users;
    default:
      return state;
  }
};

export default users;
