import styles from './Loader.module.scss';

const Loader = () => {
  return (
    <div className={styles.loader}>
      <div className={styles.loader__element}></div>
    </div>
  );
};

export default Loader;
