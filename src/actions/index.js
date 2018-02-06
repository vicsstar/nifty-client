import * as types from '../actions/constants/action-types';

export const addMessage = (
  message, nickname, channelId, isPrivate, time
) => ({
  type: types.MESSAGE_ADD,
  message: message.trim(),
  id: Math.abs(Math.random(100000) * 100000),
  nickname,
  channelId,
  isPrivate,
  time
});

export const addOwnMessage = (
  { message, nickname, time, id, channelId, isPrivate
}) => ({
  type: types.OWN_NEW_MESSAGE,
  message: message.trim(),
  author: nickname,
  channelId,
  isPrivate,
  time,
  id
});

export const addUser = nickname => ({
  type: types.USER_ADD,
  nickname
});

export const removeUser = nickname => ({
  type: types.USER_LEAVE,
  nickname
});

export const addChannelList = channels => ({
  type: types.CHANNEL_LIST,
  channels
});

export const joinRoom = (roomId, nickname) => ({
  type: types.ROOM_JOIN,
  roomId,
  nickname
});

export const leaveRoom = nickname => ({
  type: types.ROOM_LEAVE,
  nickname
});
