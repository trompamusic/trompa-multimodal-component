import React from 'react';

const wrapComponent = Component => {
  return class Provided extends React.PureComponent {
    render() {
      const { tReady, i18n, staticContext, forwardedRef, ...props } = this.props;

      return <Component ref={forwardedRef} {...props} />;
    }
  };
};

export const providers = (Component, ...wrappers) => {
  let wrappedComponent = wrapComponent(Component);

  wrappers.forEach(fn => {
    wrappedComponent = fn(wrappedComponent);
    wrappedComponent.displayName = Component.displayName || Component.name || 'Component';
    delete wrappedComponent.getDisplayName;
  });

  return wrappedComponent;
};

export const setPrerenderReady = status => (window.prerenderReady = status);

