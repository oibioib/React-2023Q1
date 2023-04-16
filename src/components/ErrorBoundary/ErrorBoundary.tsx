import { Component, ReactNode } from 'react';

import { ErrorMessage } from '@components';

interface ErrorBoundaryProps {
  children?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  message: string;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, message: '' };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, message: error.message };
  }

  render() {
    const { children } = this.props;
    const { hasError, message } = this.state;

    return (
      <>
        {!hasError && children}
        {hasError && <ErrorMessage message={message} />}
      </>
    );
  }
}

export default ErrorBoundary;
