import { Component } from 'react';

interface InputTextProps {
  forwardedRef: React.RefObject<HTMLInputElement>;
  errorMessage?: string;
  isValid: boolean;
}

class InputFile extends Component<InputTextProps> {
  render() {
    const { forwardedRef, errorMessage, isValid } = this.props;
    return (
      <div>
        <input ref={forwardedRef} type="file" name="image" accept="image/*" />
        {!isValid && <div>{errorMessage}</div>}
      </div>
    );
  }
}

export default InputFile;
