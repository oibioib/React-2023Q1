import { Component } from 'react';

import { getId } from '@helpers';

interface InputCheckboxProps {
  forwardedRef: React.RefObject<HTMLInputElement>;
  labelText: string;
}

class InputCheckbox extends Component<InputCheckboxProps> {
  render() {
    const { forwardedRef, labelText } = this.props;
    const id = getId().toString();
    return (
      <div>
        <input type="checkbox" id={id} ref={forwardedRef} />
        <label htmlFor={id}>{labelText}</label>
      </div>
    );
  }
}

export default InputCheckbox;