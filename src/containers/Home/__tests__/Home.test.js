import React from 'react';
import { shallow, mount } from 'enzyme';
import Home from '../Home';
import Intro from '../Intro';
import Features from '../Features';

describe('<Home />', () => {
  const renderComponent = shallow(<Home />);

  it('should have a h1 title', () => {
    expect(mount(<Home />).find('h1').length).toBe(1);
  });

  it('should render Intro', () => {
    expect(renderComponent.find(Intro).length).toBe(1);
  });

  it('should render Features', () => {
    expect(renderComponent.find(Features).length).toBe(1);
  });
});
