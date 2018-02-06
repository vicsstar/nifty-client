import {
  addMessage,
  addOwnMessage,
  addUser,
  removeUser
} from '../../actions';

export default dispatch => ({
  addUser: nickname => {
    dispatch(addUser(nickname));
  },
  removeUser: nickname => {
    dispatch(removeUser(nickname));
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
