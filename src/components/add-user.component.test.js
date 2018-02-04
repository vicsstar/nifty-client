import React from 'react';
import { Router } from 'react-router-dom';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import AddUser from '../components/add-user.component';
import { store } from './test-stubs';

const setup = (push = jest.fn(), listen = jest.fn()) => {
  const props = { store };
  const history = {
    location: {
      pathname: '/'
    },
    push,
    listen
  };

  Enzyme.configure({ adapter: new Adapter() });
  const enzymeWrapper = mount(
    <Router history={history}>
      <AddUser {...props} />
    </Router>
  );

  return {
    props,
    enzymeWrapper
  };
};

describe('AddUser', () => {
  it('should render itself', () => {
    const { enzymeWrapper } = setup();
    const input = enzymeWrapper.find('input');
    const enterButton = enzymeWrapper.find('button');

    expect(enzymeWrapper.find('.add-user .greeting').length).toBe(1);
    expect(input.length).toBe(1);
    expect(enterButton.text()).toBe('ENTER');
  });
});
