import { Component } from 'react';

type RadioOption = {
  id: string;
  title: string;
  forwardedRef: React.RefObject<HTMLInputElement>;
};

interface InputRadioProps {
  groupName: string;
  errorMessage?: string;
  isValid: boolean;
  options: RadioOption[];
}

class InputRadio extends Component<InputRadioProps> {
  render() {
    const { options, groupName, isValid, errorMessage } = this.props;

    const renderOptions = options.map(({ title, forwardedRef, id }) => {
      return (
        <div key={id}>
          <input type="radio" name={groupName} id={id} ref={forwardedRef} data-value={title} />
          <label htmlFor={id}>{title}</label>
        </div>
      );
    });

    return (
      <>
        {renderOptions}
        {!isValid && <div>{errorMessage}</div>}
      </>
    );
  }
}

export default InputRadio;
