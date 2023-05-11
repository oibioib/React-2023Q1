import { useFormContext } from 'react-hook-form';

import { FormErrorMessage } from '@components';
import { toTitleCase } from '@helpers';
import formElements from '@scss/components/form-elements.module.scss';

import styles from './InputRadio.module.scss';

interface InputRadioProps {
  groupName: string;
  options: string[];
  errorMessage: string;
  testId: string;
}

const InputRadio = ({ options, groupName, errorMessage, testId }: InputRadioProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const optionsRender = options.map((option, i) => {
    const optionValue = toTitleCase(option);
    const id = `${groupName}-${i}`;

    return (
      <div key={option} className={styles['input-radio__block']}>
        <input
          data-testid={option}
          {...register(groupName, { required: true })}
          type="radio"
          value={optionValue}
          id={id}
        />
        <label htmlFor={id}>{optionValue}</label>
      </div>
    );
  });

  const inputStyles =
    (!errors[groupName] && styles['input-radio__option']) ||
    [styles['input-radio__option'], formElements.input_warning].join(' ');

  return (
    <div className={styles['input-radio']} data-testid={testId ?? ''}>
      <div className={inputStyles}>{optionsRender}</div>
      {errors[groupName] && <FormErrorMessage message={errorMessage} />}
    </div>
  );
};

export default InputRadio;
