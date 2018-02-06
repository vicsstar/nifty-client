import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ChatRoom from '../components/chat-room.component';

const setup = () => {
  const props = {
    messages: [],
    displayName: 'vicsstar',
    nickname: 'vicsstar',
    channel: {
      id: '1002'
    },
    addMessage: jest.fn(),
    addOwnMessage: jest.fn()
  };

  Enzyme.configure({ adapter: new Adapter() });
  const enzymeWrapper = mount(
    <ChatRoom {...props} />
  );

  return {
    props,
    enzymeWrapper
  };
};

describe('ChatRoom', () => {
  it('should render itself', () => {
    const { enzymeWrapper } = setup();

    expect(enzymeWrapper.find('.chat-view .messages-view').length).toBe(1);
    expect(enzymeWrapper.find('MessageInput')).toBeDefined();
  });
});
