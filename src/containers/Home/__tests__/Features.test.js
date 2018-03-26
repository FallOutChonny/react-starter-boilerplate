import React from 'react';
import { shallow } from 'enzyme';
import Features from '../Features';

describe('<Featrues />', () => {
  const renderComponent = shallow(<Features />);
  it('should have a h2 title', () => {
    expect(renderComponent.find('h2').length).not.toBe(0);
  });

  it('should have multiple features', () => {
    expect(renderComponent.find('li').length).not.toBe(0);
  });
});
