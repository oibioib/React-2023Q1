import { TEXT } from '@constants';

import styles from './ErrorMessage.module.scss';

interface ErrorMessageProps {
  message?: string;
}

const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return (
    <div className={styles.error}>
      <span className={styles.error__heading}>{TEXT.MESSAGES.ERROR}</span>
      <div>{message}</div>
    </div>
  );
};

export default ErrorMessage;
