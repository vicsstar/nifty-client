import * as types from '../actions/constants/action-types';

const rooms = (state = [], data) => {
  switch(data.type) {
    case types.ROOM_LIST:
      return data.rooms;
    default:
      return state;
  }
};

export default rooms;
