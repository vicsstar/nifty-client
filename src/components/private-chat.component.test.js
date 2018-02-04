import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { Router, StaticRouter } from 'react-router-dom';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import PrivateChat from '../components/private-chat.component';
import reducers from '../reducers';
import './test-stubs';

const setup = () => {
  const props = {
    messages: [],
    match: {
      params: {
        nickname: 'vicsstar'
      }
    }
  };
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

  Enzyme.configure({ adapter: new Adapter() });
  const enzymeWrapper = mount(
    <Provider store={createStore(reducers)}>
      <Router history={history}>
        <PrivateChat {...props} />
      </Router>
    </Provider>
  );

  return {
    props,
    enzymeWrapper
  };
};

describe('PrivateChat', () => {
  it('should render itself', () => {
    const { enzymeWrapper } = setup();
    expect(enzymeWrapper.find('#private-chat ChatRoom').length).toBe(1);
  });
});
