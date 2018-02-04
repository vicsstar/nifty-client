import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import RoomList from '../components/room-list.component';
import { Router } from 'react-router-dom';
import reducers from '../reducers';
import { store } from './test-stubs';

const setup = (rooms = []) => {
  const props = {};
  const history = {
    location: {
      pathname: '/'
    },
    push: jest.fn(),
    listen: jest.fn()
  };
  localStorage.getItem = jest.fn(() => {
    return 'vicsstar';
  });
  store.getState = jest.fn(() => {
    return { rooms };
  });

  Enzyme.configure({ adapter: new Adapter() });
  const enzymeWrapper = mount(
    <Router history={history}>
      <RoomList {...props} store={store} />
    </Router>
  );

  return {
    props,
    enzymeWrapper
  };
};

describe('RoomList', () => {
  it('should render itself', () => {
    const rooms = [];
    const { enzymeWrapper } = setup(rooms);

    expect(enzymeWrapper.find('#room-list .rooms').length).toBe(1);
    expect(enzymeWrapper.find('li').length).toBe(0);
  });
});
