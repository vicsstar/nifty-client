import {
  addMessage,
  addOwnMessage,
  addUser,
  addRoomList,
  joinRoom,
  leaveRoom
}  from '../actions';
import * as types from './constants/action-types';

describe('Messages', () => {
  let message,
      nickname,
      channelId,
      isPrivate;
  let action;

  beforeEach(() => {
    message = 'Hello ';
    nickname = 'vicsstar';
    channelId = '1002';
    isPrivate = false;

    action = {
      type: types.MESSAGE_ADD,
      id: Math.abs(Math.random(100000) * 100000),
      message: message.trim(),
      nickname,
      channelId,
      isPrivate
    };
  });

  it('should create an action', () => {
    const addedMessage = addMessage(message, nickname, channelId, isPrivate);
    delete action.id;
    delete addedMessage.id;

    expect(addedMessage).toEqual(action);
  });

  it('should create own action from regular action', () => {
    const addedMessage = addMessage(message, nickname, channelId, isPrivate);
    addedMessage.author = addedMessage.nickname;
    delete addedMessage.nickname;

    const ownAddedMessage = addOwnMessage({
      id: addedMessage.id, message, nickname, channelId, isPrivate
    });
    expect(ownAddedMessage.type).toEqual(types.OWN_NEW_MESSAGE);

    delete addedMessage.type;
    delete ownAddedMessage.type;
    expect(addedMessage).toEqual(ownAddedMessage);
  });

  it('should trim message text in action', () => {
    const addedMessage = addMessage(message, nickname, channelId, isPrivate);
    expect(addedMessage.message).toEqual(message.trim());
  });

  it('should trim message text in own action', () => {
    const ownMessage = addOwnMessage({ message });
    expect(message.trim()).toEqual(ownMessage.message);
  });

  it(`should add an 'id' attribute`, () => {
    delete action.id;

    const addedMessage = addMessage(
      action.message,
      action.nickname,
      action.channelId,
      action.isPrivate
    );
    expect(addedMessage.id).toBeDefined();
  });
});

describe('Users', () => {
  it('should create an add user action', () => {
    const nickname = 'vicsstar';
    const user = {
      type: types.USER_ADD,
      nickname
    };
    expect(addUser(nickname)).toEqual(user);
  });
});
