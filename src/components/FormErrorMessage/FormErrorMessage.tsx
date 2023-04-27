import base from '@scss/components/base.module.scss';

import styles from './FormErrorMessage.module.scss';

interface FormErrorMessageProps {
  message: string;
}

const FormErrorMessage = ({ message }: FormErrorMessageProps) => {
  return (
    <div
      className={[base.center, base.warning, styles.error].join(' ')}
      data-testid="error-message"
    >
      {message}
    </div>
  );
};

export default FormErrorMessage;
