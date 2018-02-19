import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Channels from '../components/channels.component';

const setup = (channels = []) => {
  const props = {
    nickname: 'vicsstar',
    channels,
    activeChannel: {
      id: '1002'
    },
    onOpenChannel: jest.fn()
  };

  Enzyme.configure({ adapter: new Adapter() });
  const enzymeWrapper = mount(
    <Channels {...props} />
  );

  return {
    props,
    enzymeWrapper
  };
};

describe('Channels', () => {
  it('should render itself', () => {
    const { enzymeWrapper } = setup();

    expect(enzymeWrapper.find('#channel-list .items').length).toBe(1);
  });

  it('should list channels', () => {
    const { enzymeWrapper } = setup([
      { name: 'general', id: '1001' },
      { name: 'random', id: '1002' },
      { name: 'slackbot', id: '1003' }
    ]);
    expect(enzymeWrapper.find('#channel-list ul li').length).toBe(3);
  });
});
