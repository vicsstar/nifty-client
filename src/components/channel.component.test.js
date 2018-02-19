import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Channel from '../components/channel.component';

const setup = () => {
  const props = {
    name: 'general',
    link: '#/channel/general',
    channel: {
      id: '1002',
      name: 'random'
    }
  };

  Enzyme.configure({ adapter: new Adapter() });
  const enzymeWrapper = mount(
    <Channel {...props} />
  );

  return {
    props,
    enzymeWrapper
  };
};

describe('Channel', () => {
  it('should render itself', () => {
    const { enzymeWrapper } = setup();

    expect(enzymeWrapper.find('li a').length).toBe(1);
  });
});
