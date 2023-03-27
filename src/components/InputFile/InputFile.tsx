import { Component } from 'react';

import { ErrorMessage } from '@components';

interface InputTextProps {
  forwardedRef: React.RefObject<HTMLInputElement>;
  errorMessage: string;
  isValid: boolean;
}

class InputFile extends Component<InputTextProps> {
  render() {
    const { forwardedRef, errorMessage, isValid } = this.props;
    return (
      <div data-testid="form-element">
        <input ref={forwardedRef} type="file" name="image" accept="image/*" />
        {!isValid && <ErrorMessage message={errorMessage} />}
      </div>
    );
  }
}

export default InputFile;
