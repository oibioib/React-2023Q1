import React, { Component } from 'react';

import base from '@scss/components/base.module.scss';

import styles from './ErrorMessage.module.scss';

interface ErrorMessageProps {
  message: string;
}
class ErrorMessage extends Component<ErrorMessageProps> {
  render() {
    return (
      <div
        className={[base.center, base.warning, styles.error].join(' ')}
        data-testid="error-message"
      >
        {this.props.message}
      </div>
    );
  }
}

export default ErrorMessage;
