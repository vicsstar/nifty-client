import {
  joinRoom,
  leaveRoom,
  addMessage,
  addOwnMessage
} from '../../actions';

export default dispatch => ({
  joinRoom: (roomId, nickname) => {
    dispatch(joinRoom(roomId, nickname));
  },
  leaveRoom: nickname => {
    dispatch(leaveRoom(nickname));
  },
  addMessage: data => {
    const message = addMessage(
      data.message,
      data.nickname,
      data.roomId,
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
