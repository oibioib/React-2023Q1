import { Component } from 'react';

interface InputTextProps {
  forwardedRef: React.RefObject<HTMLInputElement>;
  errorMessage?: string;
  isValid: boolean;
}

class InputText extends Component<InputTextProps> {
  render() {
    const { forwardedRef, errorMessage, isValid } = this.props;
    return (
      <div>
        <input ref={forwardedRef} type="text" />
        {!isValid && <div>{errorMessage}</div>}
      </div>
    );
  }
}

export default InputText;
