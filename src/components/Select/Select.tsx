import { Component } from 'react';

interface SelectProps {
  forwardedRef: React.RefObject<HTMLSelectElement>;
  errorMessage?: string;
  isValid: boolean;
  options: string[];
}

class Select extends Component<SelectProps> {
  render() {
    const { forwardedRef, errorMessage, isValid, options } = this.props;
    return (
      <div>
        <select ref={forwardedRef}>
          <option key="default" value="">
            Chose a brand
          </option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        {!isValid && <div>{errorMessage}</div>}
      </div>
    );
  }
}

export default Select;
