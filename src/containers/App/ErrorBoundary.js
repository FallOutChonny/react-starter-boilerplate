import React from 'react';
import PropTypes from 'prop-types';

export default class ErrorBoundary extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  state = { hasError: false }; // eslint-disable-line

  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({ hasError: true }); // eslint-disable-line
    // You can also log the error to an error reporting service
    /* Example stack information:
       in ComponentThatThrows (created by App)
       in ErrorBoundary (created by App)
       in div (created by App)
       in App
    */
    // logErrorToMyService(error, info.componentStack);
    // Currently we just log it.
    console.error(info.componentStack);
  }

  render() {
    // TODO: Error Page
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}
