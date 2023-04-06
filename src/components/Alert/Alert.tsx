import styles from './Alert.module.scss';

interface AlertProps {
  message: string;
  type: 'success' | 'warning';
  onAnimationEnd: () => void;
}

const Alert = ({ message, type, onAnimationEnd }: AlertProps) => {
  return (
    <div
      onAnimationEnd={onAnimationEnd}
      className={[styles.alert, styles[`alert_${type}`]].join(' ')}
      data-testid="alert-block"
    >
      <span>{message}</span>
      <div className={styles.alert__loading}></div>
    </div>
  );
};

export default Alert;
