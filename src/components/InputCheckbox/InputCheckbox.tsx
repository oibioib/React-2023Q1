import { useFormContext } from 'react-hook-form';

import { getId } from '@helpers';

import styles from './InputCheckbox.module.scss';

interface InputCheckboxProps {
  inputName: string;
  labelText: string;
  testId?: string;
}

const InputCheckbox = ({ inputName, labelText, testId }: InputCheckboxProps) => {
  const id = getId().toString();
  const { register } = useFormContext();

  return (
    <div data-testid={testId ?? ''} className={styles['input-checkbox']}>
      <input {...register(inputName)} type="checkbox" id={id} />
      <label htmlFor={id}>{labelText}</label>
    </div>
  );
};

export default InputCheckbox;
