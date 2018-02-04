import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Message from '../components/message.component';

const setup = ({
    message = 'Hello World!',
    author = 'vicsstar',
    myNickname = 'john' }) => {
  const props = {
    message: {
      message,
      author,
      time: new Date().getTime()
    },
    myNickname
  };

  Enzyme.configure({ adapter: new Adapter() });
  const enzymeWrapper = mount(
    <Message {...props} />
  );

  return {
    props,
    enzymeWrapper
  };
};

describe('Message', () => {
  it('should render itself', () => {
    const { enzymeWrapper } = setup({});
    expect(enzymeWrapper.find('.message-view').length).toBe(1);
  });

  it('should know if message is from self', () => {
    const { enzymeWrapper } = setup({ myNickname: 'vicsstar' });
    expect(enzymeWrapper.find('.message-view.me').length).toBe(1);
  });

  it('should convert new-line to <br> elements in message body', () => {
    const { enzymeWrapper } = setup({ message: 'One,Two\nThree' });
    const messageSpan = enzymeWrapper.find('.message-view .content .message');
    expect(messageSpan.find('br')).toBeTruthy();
  });
});
