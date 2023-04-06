import { useFormContext } from 'react-hook-form';

import { ErrorMessage } from '@components';
import formElements from '@scss/components/form-elements.module.scss';

interface SelectProps {
  selectName: string;
  options: string[];
  placeholder: string;
  errorMessage: string;
  testId?: string;
}

const Select = ({ selectName, options, placeholder, errorMessage, testId }: SelectProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div data-testid={testId ?? ''}>
      <select
        {...register(selectName, { required: true })}
        className={
          (!errors[selectName] && formElements.input) ||
          [formElements.input, formElements.input_warning].join(' ')
        }
      >
        <option key="default" value="">
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {errors[selectName] && <ErrorMessage message={errorMessage} />}
    </div>
  );
};

export default Select;
