import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Users from '../components/users.component';

const setup = (users = []) => {
  const props = {
    nickname: 'vicsstar',
    users,
    activeChannel: {
      id: '1002'
    }
  };

  Enzyme.configure({ adapter: new Adapter() });
  const enzymeWrapper = mount(
    <Users {...props} />
  );

  return {
    props,
    enzymeWrapper
  };
};

describe('Users', () => {
  it('should render itself', () => {
    const { enzymeWrapper } = setup();

    expect(enzymeWrapper.find('#user-list .items').length).toBe(1);
  });

  it('should know if user is me', () => {
    const { enzymeWrapper } = setup([{
      nickname: 'vicsstar'
    }]);
    expect(enzymeWrapper.find('li').text()).toEqual('@vicsstar (you)');
  });

  it('should list users', () => {
    const { enzymeWrapper } = setup([
      { nickname: 'vicsstar' },
      { nickname: 'john' },
      { nickname: 'clive' }
    ]);
    expect(enzymeWrapper.find('#user-list ul li').length).toBe(3);
  });
});
