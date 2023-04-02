import { useFormContext } from 'react-hook-form';

import { ErrorMessage } from '@components';
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

  const optionsRender = options.map((option) => {
    const optionValue = toTitleCase(option);
    const id = option.toLowerCase().replace(' ', '_');
    return (
      <div key={option} className={styles['input-radio__block']}>
        <input
          data-testid={option}
          {...register(groupName, { required: true })}
          type="radio"
          value={optionValue}
          id={id}
          className={styles['input-radio__input']}
        />
        <label htmlFor={id}>{optionValue}</label>
      </div>
    );
  });

  return (
    <div className={styles['input-radio']} data-testid={testId ?? ''}>
      <div
        className={
          (!errors[groupName] && styles['input-radio__option']) ||
          [styles['input-radio__option'], formElements.input_warning].join(' ')
        }
      >
        {optionsRender}
      </div>
      {errors[groupName] && <ErrorMessage message={errorMessage} />}
    </div>
  );
};

export default InputRadio;
