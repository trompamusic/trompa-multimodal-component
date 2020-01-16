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
    wrappedComponent             = fn(wrappedComponent);
    wrappedComponent.displayName = Component.displayName || Component.name || 'Component';
    delete wrappedComponent.getDisplayName;
  });

  return wrappedComponent;
};

export const setPrerenderReady = status => (window.prerenderReady = status);

export const getUrlHostName = url => {
  const match = url.match(/:\/\/(www[0-9]?\.)?(.[^/:]+)/i);

  if ( match != null && match.length > 2 && typeof match[2] === 'string' && match[2].length > 0) {
    return match[2];
  }

  return null;
};