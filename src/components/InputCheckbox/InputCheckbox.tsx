import { useFormContext } from 'react-hook-form';

import { generateId } from '@helpers';

import styles from './InputCheckbox.module.scss';

interface InputCheckboxProps {
  inputName: string;
  labelText: string;
  testId?: string;
}

const InputCheckbox = ({ inputName, labelText, testId }: InputCheckboxProps) => {
  const id = generateId();
  const { register } = useFormContext();

  return (
    <div data-testid={testId ?? ''} className={styles['input-checkbox']}>
      <input {...register(inputName)} type="checkbox" id={id} />
      <label htmlFor={id}>
        <span></span>
        {labelText}
      </label>
    </div>
  );
};

export default InputCheckbox;
