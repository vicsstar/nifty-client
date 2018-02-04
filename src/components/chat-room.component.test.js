import React from 'react';
import createBrowserHistory from 'history/createBrowserHistory';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ChatRoom from '../components/chat-room.component';

const setup = () => {
  const props = {
    messages: [],
    displayName: 'vicsstar',
    nickname: 'vicsstar',
    addMessage: jest.fn()
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
