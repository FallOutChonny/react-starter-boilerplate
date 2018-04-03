import React from 'react';
import { shallow } from 'enzyme';
import Home from '../Home';
import Intro from '../Intro';

describe('<Home />', () => {
  const renderComponent = shallow(<Home />);

  it('should render Intro', () => {
    expect(renderComponent.find(Intro).length).toBe(1);
  });
});
