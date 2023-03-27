import { Component } from 'react';

interface InputDateProps {
  forwardedRef: React.RefObject<HTMLInputElement>;
  errorMessage?: string;
  isValid: boolean;
}

class InputDate extends Component<InputDateProps> {
  render() {
    const { forwardedRef, errorMessage, isValid } = this.props;
    return (
      <div>
        <input ref={forwardedRef} type="date" />
        {!isValid && <div>{errorMessage}</div>}
      </div>
    );
  }
}

export default InputDate;
