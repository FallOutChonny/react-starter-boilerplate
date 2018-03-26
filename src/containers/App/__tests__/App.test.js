import React from 'react';
import { Route } from 'react-router-dom';
import { shallow } from 'enzyme';
import createHistory from 'history/createBrowserHistory';
import Header from '../Header';
import Footer from '../Footer';
import App from '../index';
import Home from '../../Home';

const history = createHistory();
const route = {
  component: jest.fn(),
  routes: [
    {
      component: Home,
      exact: true,
      path: '/',
    },
  ],
};

describe('<App />', () => {
  it('renders with Route', () => {
    const renderedComponent = shallow(<App history={history} route={route} />);
    expect(renderedComponent.find(Route).length).not.toBe(0);
  });

  it('should render Header', () => {
    const renderedComponent = shallow(<App history={history} route={route} />);
    expect(renderedComponent.find(Header).length).toBe(1);
  });

  it('should render Footer', () => {
    const renderedComponent = shallow(<App history={history} route={route} />);
    expect(renderedComponent.find(Footer).length).toBe(1);
  });
});
