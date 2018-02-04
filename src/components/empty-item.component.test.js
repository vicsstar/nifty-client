import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import EmptyItem from '../components/empty-item.component';

const setup = () => {
  Enzyme.configure({ adapter: new Adapter() });
  const enzymeWrapper = shallow(
    <EmptyItem>List is empty.</EmptyItem>
  );
  return enzymeWrapper;
};

describe('EmptyItem', () => {
  it('should render itself', () => {
    const enzymeWrapper = setup();

    expect(enzymeWrapper.first().text()).toEqual('List is empty.');
  });
});
