import base from '@scss/components/base.module.scss';

import styles from './ErrorMessage.module.scss';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return (
    <div
      className={[base.center, base.warning, styles.error].join(' ')}
      data-testid="error-message"
    >
      {message}
    </div>
  );
};

export default ErrorMessage;
