import * as types from '../actions/constants/action-types';

export const addMessage = (message, nickname, roomId, isPrivate) => ({
  type: types.MESSAGE_ADD,
  message: message.trim(),
  id: Math.abs(Math.random(100000) * 100000),
  nickname,
  roomId,
  isPrivate
});

export const addOwnMessage = ({ message, nickname, id, roomId, isPrivate }) => ({
  type: types.OWN_NEW_MESSAGE,
  message: message.trim(),
  author: nickname,
  roomId,
  isPrivate,
  id,
});

export const addUser = nickname => ({
  type: types.USER_ADD,
  nickname
});

export const addRoomList = rooms => ({
  type: types.ROOM_LIST,
  rooms: rooms
});

export const joinRoom = (roomId, nickname) => ({
  type: types.ROOM_JOIN,
  roomId,
  nickname
});

export const leaveRoom = (nickname) => ({
  type: types.ROOM_LEAVE,
  nickname
});
