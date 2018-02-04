import * as types from '../actions/constants/action-types';

const messages = (state = [], data) => {
  switch(data.type) {
    case types.NEW_MESSAGE:
      return state.concat([
        {
          message: data.message,
          author: data.author,
          time: data.time,
          roomId: data.roomId,
          isPrivate: data.isPrivate,
          id: data.id
        }
      ]);
    case types.OWN_NEW_MESSAGE:
      return state.concat([
        {
          message: data.message,
          author: data.author,
          time: data.time,
          roomId: data.roomId,
          isPrivate: data.isPrivate,
          id: data.id
        }
      ]);
    default:
      return state;
  }
}

export default messages;
