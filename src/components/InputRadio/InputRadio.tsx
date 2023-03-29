import { Component } from 'react';

import { ErrorMessage } from '@components';
import formElements from '@scss/components/form-elements.module.scss';

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
        <div key={id} className={styles['input-radio__block']}>
          <input
            type="radio"
            name={groupName}
            id={id}
            ref={forwardedRef}
            data-value={title}
            className={styles['input-radio__input']}
          />
          <label htmlFor={id}>{title}</label>
        </div>
      );
    });

    return (
      <div className={styles['input-radio']} data-testid="form-element">
        <div
          // className={styles['input-radio__option']}
          className={
            (isValid && styles['input-radio__option']) ||
            [styles['input-radio__option'], formElements.input_warning].join(' ')
          }
        >
          {renderOptions}
        </div>
        {!isValid && <ErrorMessage message={errorMessage} />}
      </div>
    );
  }
}

export default InputRadio;
