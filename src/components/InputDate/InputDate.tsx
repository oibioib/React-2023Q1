import { Component } from 'react';

import { ErrorMessage } from '@components';
import formElements from '@scss/components/form-elements.module.scss';

interface InputDateProps {
  forwardedRef: React.RefObject<HTMLInputElement>;
  errorMessage: string;
  isValid: boolean;
}

class InputDate extends Component<InputDateProps> {
  render() {
    const { forwardedRef, errorMessage, isValid } = this.props;
    return (
      <div data-testid="form-element">
        <input
          ref={forwardedRef}
          type="date"
          className={
            (isValid && formElements.input) ||
            [formElements.input, formElements.input_warning].join(' ')
          }
        />
        {!isValid && <ErrorMessage message={errorMessage} />}
      </div>
    );
  }
}

export default InputDate;
