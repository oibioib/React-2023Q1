import React from 'react';
import { useLocation } from 'react-router-dom';

export interface WithLocationProps {
  location: ReturnType<typeof useLocation>;
}

const withLocation = <T extends WithLocationProps>(Component: React.ComponentType<T>) => {
  const ComponentWithLocation = (props: Omit<T, keyof WithLocationProps>) => {
    const location = useLocation();
    return <Component {...(props as T)} location={location} />;
  };

  return ComponentWithLocation;
};

export { withLocation };
