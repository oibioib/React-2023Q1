import { Component } from 'react';

import { ErrorMessage } from '@components';

import styles from './InputRadio.module.scss';

type RadioOption = {
  id: string;
  title: string;
  forwardedRef: React.RefObject<HTMLInputElement>;
};

interface InputRadioProps {
  groupName: string;
  errorMessage: string;
  isValid: boolean;
  options: RadioOption[];
}

class InputRadio extends Component<InputRadioProps> {
  render() {
    const { options, groupName, isValid, errorMessage } = this.props;

    const renderOptions = options.map(({ title, forwardedRef, id }) => {
      return (
        <div key={id} className={styles.radio__block}>
          <input
            type="radio"
            name={groupName}
            id={id}
            ref={forwardedRef}
            data-value={title}
            className={styles.radio__input}
          />
          <label htmlFor={id}>{title}</label>
        </div>
      );
    });

    return (
      <div className={styles.radio}>
        <div className={styles.radio__option}>{renderOptions}</div>
        {!isValid && <ErrorMessage message={errorMessage} />}
      </div>
    );
  }
}

export default InputRadio;
