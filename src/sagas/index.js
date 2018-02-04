import { takeEvery, all } from 'redux-saga/effects';
import * as types from '../actions/constants/action-types';

function* watchAll(params) {
  yield all([
    takeEvery(types.USER_ADD, action => {
      params.socket.send(action);
      localStorage.setItem('nickname', action.nickname);
    }),
    takeEvery(types.MESSAGE_ADD, action => {
      params.socket.send(action);
    }),
    takeEvery(types.NEW_MESSAGE, action => {
      const { author, message, id, roomId, isPrivate } = action;
      return {
        message: { author, message, id, roomId, isPrivate }
      };
    }),
    takeEvery(types.OWN_NEW_MESSAGE, action => {
      const { author, message, id, roomId, isPrivate } = action;
      return {
        message: { author, message, id, roomId, isPrivate }
      };
    }),
    takeEvery(types.ROOM_JOIN, action => {
      params.socket.send(action);
    }),
    takeEvery(types.ROOM_LEAVE, action => {
      params.socket.send(action);
    }),
    takeEvery(types.ROOM_LIST, action => {
      return { rooms: action.rooms };
    })
  ]);
}

export default watchAll;
