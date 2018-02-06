import {
  joinRoom,
  leaveRoom,
  addMessage,
  addOwnMessage,
  addUser
} from '../../actions';

export default dispatch => ({
  joinRoom: (roomId, nickname) => {
    dispatch(joinRoom(roomId, nickname));
  },
  leaveRoom: nickname => {
    dispatch(leaveRoom(nickname));
  },
  addUser: nickname => {
    dispatch(addUser(nickname));
  },
  addMessage: data => {
    const message = addMessage(
      data.message,
      data.nickname,
      data.channelId,
      data.isPrivate,
      data.time
    );
    dispatch(message);
    return message;
  },
  addOwnMessage: data => {
    dispatch(addOwnMessage(data));
  }
});
