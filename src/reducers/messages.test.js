import messages from "./messages";
import * as types from "../actions/constants/action-types";

describe('Messages reducer', () =>{
  it('should return initial state - empty', () => {
    expect(messages(undefined, {})).toEqual([]);
  });

  it('should handle NEW_MESSAGE action', () => {
    const id = Math.random().toString();
    const message1 = {
      type: types.NEW_MESSAGE,
      message: 'Testing',
      author: 'vicsstar',
      roomId: '1002',
      isPrivate: false,
      id
    };
    const message2 = JSON.parse(JSON.stringify(message1));
    delete message2.type;

    expect(
      messages([], message1)
    ).toEqual([message2]);

    expect(
      messages([message2], message1)
    ).toEqual(
      [message2, message2]
    );
  });

  it('should handle OWN_NEW_MESSAGE action', () => {
    const id = Math.random().toString();
    const message1 = {
      type: types.OWN_NEW_MESSAGE,
      message: 'Testing',
      author: 'vicsstar',
      roomId: '1002',
      isPrivate: false,
      id
    };
    const message2 = JSON.parse(JSON.stringify(message1));
    delete message2.type;

    expect(
      messages([], message1)
    ).toEqual([message2]);

    expect(
      messages([message2], message1)
    ).toEqual(
      [message2, message2]
    );
  });
});