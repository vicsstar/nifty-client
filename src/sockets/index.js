import * as types from '../actions/constants/action-types';
import {
  addUser,
  addChannelList
} from '../actions';

const setupWebSocket = dispatch => {
  // const host = window.location.origin.replace(/^http/, 'ws');
  const host = 'ws://localhost:3000';
  this.socket = null;

  const onmessage = event => {
    const data = JSON.parse(event.data);

    switch(data.type) {
      case types.USER_ADD:
        dispatch(addUser(data.nickname));
        break;
      case types.USER_LIST:
        dispatch(data);
        break;
      case types.CHANNEL_LIST:
        dispatch(addChannelList(data.channels));

        if (data.users && data.users.length !== 0) {
          dispatch({
            type: types.USER_LIST,
            users: data.users
          });
        }
        break;
      case types.NEW_MESSAGE:
        dispatch(data);
        break;
      default:
    }
  };

  const nextWaitTime = previousTime => previousTime * 2 - 250;

  this.waitForConnection = (data, func, waitTime) => {
    if (!this.socket ||
        this.socket.readyState === WebSocket.CLOSED ||
        this.socket.readyState === WebSocket.CLOSING) {
      this.socket = new WebSocket(host);
      this.socket.onmessage = onmessage;
    }

    waitTime = waitTime || 500;

    setTimeout(() => {
      waitTime = nextWaitTime(waitTime);

      if (this.socket.readyState === WebSocket.OPEN) {
        func();
      } else {
        this.waitForConnection(data, func, waitTime);
      }
    }, waitTime);
  }

  this.sendData = data => {
    this.socket.send(JSON.stringify(data));
  };

  this.send = data => {
    this.waitForConnection(data, () => {
      this.sendData(data);
    });
  }
  return this;
};

export default setupWebSocket;
