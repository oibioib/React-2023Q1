import { Component } from 'react';

import { ErrorMessage } from '@components';
import elements from '@scss/layouts/elements.module.scss';

interface InputDateProps {
  forwardedRef: React.RefObject<HTMLInputElement>;
  errorMessage: string;
  isValid: boolean;
}

class InputDate extends Component<InputDateProps> {
  render() {
    const { forwardedRef, errorMessage, isValid } = this.props;
    return (
      <div>
        <input ref={forwardedRef} type="date" className={elements.input} />
        {!isValid && <ErrorMessage message={errorMessage} />}
      </div>
    );
  }
}

export default InputDate;
