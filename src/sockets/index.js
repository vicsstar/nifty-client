import * as types from '../actions/constants/action-types';
import {
  addUser,
  addChannelList
} from '../actions';

const setupWebSocket = (dispatch) => {
  var host = window.location.origin.replace(/^http/, 'ws')
  this.socket = new WebSocket(host);
  this.socketOpen = false;

  this.socket.onmessage = (event) => {
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

  this.sendData = function(data) {
    this.socket.send(JSON.stringify(data));
  };

  this.send = function(data) {
    if (this.socketOpen) {
      this.sendData(data);
    } else {
      this.socket.onopen = () => {
        this.socketOpen = true;
        this.sendData(data);
      };
    }
  }
  return this;
};

export default setupWebSocket;
