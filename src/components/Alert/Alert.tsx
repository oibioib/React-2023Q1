import styles from './Alert.module.scss';

interface Alert {
  message: string;
  backgroundColor: string;
}

const Alert = ({ message, backgroundColor }: Alert) => {
  return (
    <div className={styles.alert} style={{ backgroundColor }} data-testid="alert">
      <span>{message}</span>
    </div>
  );
};

export default Alert;
