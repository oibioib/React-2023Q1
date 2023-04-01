import { useFormContext } from 'react-hook-form';

import { ErrorMessage } from '@components';
import formElements from '@scss/components/form-elements.module.scss';

interface InputDateProps {
  inputName: string;
  errorMessage: string;
  testId?: string;
}

const InputDate = ({ inputName, errorMessage, testId }: InputDateProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div data-testid={testId ?? ''}>
      <input
        {...register(inputName, { required: true })}
        type="date"
        className={
          (!errors[inputName] && formElements.input) ||
          [formElements.input, formElements.input_warning].join(' ')
        }
      />
      {errors[inputName] && <ErrorMessage message={errorMessage} />}
    </div>
  );
};

export default InputDate;
