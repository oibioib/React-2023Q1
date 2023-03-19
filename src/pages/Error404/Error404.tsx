import { Component } from 'react';
import { Link } from 'react-router-dom';

import { TEXT } from '@constants';

import styles from './Error404.module.scss';

class Error404 extends Component {
  render() {
    return (
      <div className={styles.error}>
        <h1 className={styles.error__title}>404</h1>
        <p className={styles.error__info}>{TEXT.MESSAGES.NOT_FOUND}</p>
        <Link to="/">{TEXT.MESSAGES.GO_MAIN}</Link>
      </div>
    );
  }
}

export default Error404;
