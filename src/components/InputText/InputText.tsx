import { useFormContext } from 'react-hook-form';

import { ErrorMessage } from '@components';
import formElements from '@scss/components/form-elements.module.scss';

interface InputTextProps {
  inputName: string;
  placeholder: string;
  errorMessage: string;
  testId?: string;
}
const InputText = ({ inputName, errorMessage, placeholder, testId }: InputTextProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div data-testid={testId ?? ''}>
      <input
        {...register(inputName, { required: true })}
        type="text"
        placeholder={placeholder}
        className={
          (!errors[inputName] && formElements.input) ||
          [formElements.input, formElements.input_warning].join(' ')
        }
      />
      {errors[inputName] && <ErrorMessage message={errorMessage} />}
    </div>
  );
};

export default InputText;
