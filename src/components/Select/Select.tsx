import { Component } from 'react';

import { ErrorMessage } from '@components';
import formElements from '@scss/components/form-elements.module.scss';

interface SelectProps {
  forwardedRef: React.RefObject<HTMLSelectElement>;
  errorMessage: string;
  isValid: boolean;
  options: string[];
}

class Select extends Component<SelectProps> {
  render() {
    const { forwardedRef, errorMessage, isValid, options } = this.props;
    return (
      <div data-testid="form-element">
        <select
          ref={forwardedRef}
          className={
            (isValid && formElements.input) ||
            [formElements.input, formElements.input_warning].join(' ')
          }
        >
          <option key="default" value="">
            Chose a brand
          </option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        {!isValid && <ErrorMessage message={errorMessage} />}
      </div>
    );
  }
}

export default Select;
