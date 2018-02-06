import { takeEvery, all } from 'redux-saga/effects';
import * as types from '../actions/constants/action-types';

function* watchAll(params) {
  yield all([
    takeEvery(types.USER_ADD, action => {
      params.socket.send(action);
      localStorage.setItem('nickname', action.nickname);
    }),
    takeEvery(types.USER_LEAVE, action => {
      params.socket.send(action);
      localStorage.removeItem('nickname');
    }),
    takeEvery(types.MESSAGE_ADD, action => {
      params.socket.send(action);
    }),
    takeEvery(types.NEW_MESSAGE, action => {
      const { author, message, id, channelId, isPrivate, time } = action;
      return {
         author, message, id, channelId, isPrivate, time
      };
    }),
    takeEvery(types.OWN_NEW_MESSAGE, action => {
      const { author, message, id, channelId, isPrivate, time } = action;
      return {
         author, message, id, channelId, isPrivate, time
      };
    }),
    takeEvery(types.USER_LIST, action => ({
      users: action.users
    })),
    takeEvery(types.CHANNEL_LIST, action => ({
      channels: action.channels
    }))
  ]);
}

export default watchAll;
