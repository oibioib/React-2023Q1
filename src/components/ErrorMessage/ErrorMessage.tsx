import React, { Component } from 'react';

import elements from '@scss/layouts/elements.module.scss';

import styles from './ErrorMessage.module.scss';

interface ErrorMessageProps {
  message: string;
}
class ErrorMessage extends Component<ErrorMessageProps> {
  render() {
    return (
      <div className={[elements.center, elements.warning, styles.error].join(' ')}>
        {this.props.message}
      </div>
    );
  }
}

export default ErrorMessage;
