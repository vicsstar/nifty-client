import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import MemberList from '../components/member-list.component';

const setup = (users = []) => {
  const props = {
    nickname: 'vicsstar',
    users
  };

  Enzyme.configure({ adapter: new Adapter() });
  const enzymeWrapper = mount(
    <MemberList {...props} />
  );

  return {
    props,
    enzymeWrapper
  };
};

describe('MemberList', () => {
  it('should render itself', () => {
    const { enzymeWrapper } = setup();

    expect(enzymeWrapper.find('#user-list .items').length).toBe(1);
  });

  it('should know if user is me', () => {
    const { enzymeWrapper } = setup([{
      nickname: 'vicsstar'
    }]);
    expect(enzymeWrapper.find('span').text()).toEqual('vicsstar (You)');
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
