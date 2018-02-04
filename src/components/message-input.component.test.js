import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import MessageInput from '../components/message-input.component';
import sinon from 'sinon';

const setup = (addMessage = jest.fn(), addOwnMessage = jest.fn()) => {
  const props = {
    nickname: 'vicsstar',
    displayName: 'vicsstar',
    addMessage,
    addOwnMessage
  };

  Enzyme.configure({ adapter: new Adapter() });
  const enzymeWrapper = mount(
    <MessageInput {...props} />
  );

  return {
    props,
    enzymeWrapper
  };
};

describe('MessageInput', () => {
  let enzymeWrapper;
  let addMessage, addOwnMessage;

  beforeEach(() => {
    addMessage = sinon.spy();
    addOwnMessage = sinon.spy();

    enzymeWrapper = setup(addMessage, addOwnMessage).enzymeWrapper;
  });

  it('should render itself', () => {
    const { enzymeWrapper } = setup();

    expect(enzymeWrapper.find('.message-input-view textarea').length).toBe(1);
  });

  it('should call addMessage and addOwnMessage when send button clicked', () => {
    enzymeWrapper.ref('message').value = 'Hello World';
    enzymeWrapper.find('button').simulate('click');
    expect(addMessage.calledOnce).toBeTruthy();
    expect(addOwnMessage.calledOnce).toBeTruthy();
  });

  it('should call addMessage and addOwnMessage when Enter key pressed', () => {
    enzymeWrapper.ref('message').value = 'Hello World';
    enzymeWrapper.find('textarea').simulate('keyUp', { key: 'Enter' });

    expect(addMessage.calledOnce).toBeTruthy();
    expect(addOwnMessage.calledOnce).toBeTruthy();
  });

  it('should not call addMessage and addOwnMessage when Shift+Enter keys pressed', () => {
    enzymeWrapper.ref('message').value = 'Hello World';
    enzymeWrapper.find('textarea').simulate('keyUp', { key: 'Enter', shiftKey: true });

    expect(addMessage.calledOnce).toBeFalsy();
    expect(addOwnMessage.calledOnce).toBeFalsy();
  });

  it('should preventDefault when keyDown on Enter', () => {
    const { enzymeWrapper } = setup();
    const messageInput = enzymeWrapper.ref('message');

    const keyDownEvent = new CustomEvent('keydown', { key: 'Enter', shiftKey: false, cancelable: true });
    messageInput.addEventListener('keydown', e => e.preventDefault());
    messageInput.dispatchEvent(keyDownEvent);

    expect(keyDownEvent.defaultPrevented).toBeTruthy();
  });
});
