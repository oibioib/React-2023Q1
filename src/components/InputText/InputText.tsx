import { Component } from 'react';

import { ErrorMessage } from '@components';
import elements from '@scss/layouts/elements.module.scss';

interface InputTextProps {
  forwardedRef: React.RefObject<HTMLInputElement>;
  errorMessage: string;
  isValid: boolean;
  placeholder: string;
}

class InputText extends Component<InputTextProps> {
  render() {
    const { forwardedRef, errorMessage, isValid, placeholder } = this.props;
    return (
      <div data-testid="form-element">
        <input
          ref={forwardedRef}
          type="text"
          className={elements.input}
          placeholder={placeholder}
        />
        {!isValid && <ErrorMessage message={errorMessage} />}
      </div>
    );
  }
}

export default InputText;
