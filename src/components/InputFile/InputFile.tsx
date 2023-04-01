import { useEffect, useMemo, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { ErrorMessage } from '@components';
import { IMAGE_TYPES, TEXT } from '@constants';
import { validateForm } from '@helpers';
import formElements from '@scss/components/form-elements.module.scss';

import styles from './InputFile.module.scss';

interface InputFileProps {
  inputName: string;
  errorMessage: string;
  testId?: string;
}

const InputFile = ({ errorMessage, inputName, testId }: InputFileProps) => {
  const [message, setMessage] = useState<string>(TEXT.MESSAGES.NO_FILE);
  const [image, setImage] = useState<File | null>(null);
  const {
    register,
    formState: { errors, isSubmitSuccessful },
  } = useFormContext();

  useEffect(() => {
    if (isSubmitSuccessful) {
      setMessage(TEXT.MESSAGES.NO_FILE);
      setImage(null);
    }
  }, [isSubmitSuccessful]);

  const previewImage = useMemo(() => (image ? URL.createObjectURL(image) : undefined), [image]);

  const onFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files) {
      const [selectedFile] = files;
      const { name, type } = selectedFile;
      setMessage(name);
      setImage(validateForm.image(type, IMAGE_TYPES) ? selectedFile : null);
    }
  };

  return (
    <div data-testid={testId ?? ''} className={styles['input-file']}>
      <input
        {...register(inputName, {
          required: true,
          onChange: onFileSelect,
        })}
        type="file"
        id={inputName}
        accept="image/*"
        className={styles['input-file__hidden']}
      />
      <label
        htmlFor={inputName}
        className={
          (!errors[inputName] && formElements.input) ||
          [formElements.input, formElements.input_warning].join(' ')
        }
      >
        {TEXT.BUTTONS.SELECT_IMAGE}
      </label>
      <div className={styles['input-file__message']}>{message}</div>
      {image && <img src={previewImage} className={styles['input-file__image']} />}
      {errors[inputName] && <ErrorMessage message={errorMessage} />}
    </div>
  );
};

export default InputFile;
