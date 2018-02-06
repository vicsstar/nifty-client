import * as types from '../actions/constants/action-types';
import {
  addUser,
  addChannelList,
  joinRoom
} from '../actions';

const setupWebSocket = (dispatch) => {
  this.socket = new WebSocket('ws://localhost:3000');
  this.socketOpen = false;

  this.socket.onopen = () => {
    this.socketOpen = true;
    console.log('WebSocket has been opened.');
  };

  this.socket.onmessage = (event) => {
    const data = JSON.parse(event.data);

    switch(data.type) {
      case types.USER_ADD:
        dispatch(addUser(data.nickname));
        break;
      case types.USER_LIST:
        dispatch(data);
        break;
      case types.ROOM_JOIN:
        dispatch(joinRoom(data.roomId, data.nickname));
        break;
      case types.CHANNEL_LIST:
        dispatch(addChannelList(data.channels));
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
