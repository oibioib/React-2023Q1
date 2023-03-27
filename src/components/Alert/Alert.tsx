import React from 'react';

import styles from './Alert.module.scss';

interface AlertProps {
  message: string;
  backgroundColor: string;
}

class Alert extends React.Component<AlertProps, Record<string, never>> {
  render() {
    const { message, backgroundColor } = this.props;
    return (
      <div className={styles.alert} style={{ backgroundColor }}>
        <span>{message}</span>
      </div>
    );
  }
}

export default Alert;
