import { Component, ReactNode } from 'react';

import styles from './ErrorBoundary.module.scss';

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

    return !hasError ? (
      children
    ) : (
      <div className={styles.error}>
        <span className={styles.error__heading}>Oops! Something went wrong...</span>
        <div>Error: {message}</div>
      </div>
    );
  }
}

export default ErrorBoundary;
