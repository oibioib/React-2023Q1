import { useEffect } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

import { InputCheckbox, InputDate, InputFile, InputRadio, InputText, Select } from '@components';
import { ADD_CARD_FORM, BRANDS, CONDITION, DELIVERY, IMAGE_TYPES } from '@constants';
import { getId, validateForm } from '@helpers';
import buttons from '@scss/components/buttons.module.scss';
import { Card } from 'components/types';

import styles from './AddCardForm.module.scss';

interface AddCardFormProps {
  onSubmit: (card: Card) => void;
}

interface AddCardFormData {
  card_title: string;
  card_brand: string;
  card_date: string;
  card_condition: string;
  card_delivery: boolean;
  card_image: FileList;
}

const AddCardForm = ({ onSubmit }: AddCardFormProps) => {
  const methods = useForm<AddCardFormData>({
    reValidateMode: 'onSubmit',
  });

  const {
    handleSubmit,
    reset: resetForm,
    formState: { isSubmitSuccessful },
    setError,
  } = methods;

  useEffect(() => {
    if (isSubmitSuccessful) {
      resetForm();
    }
  }, [resetForm, isSubmitSuccessful]);

  const onSubmitHandler: SubmitHandler<AddCardFormData> = ({
    card_title,
    card_brand,
    card_date,
    card_delivery,
    card_condition,
    card_image,
  }) => {
    const [file] = card_image;

    if (!validateForm.image(file.type, IMAGE_TYPES)) {
      setError('card_image', {});
      return;
    }

    onSubmit({
      id: getId(),
      title: card_title,
      brand: card_brand,
      date: card_date,
      delivery: card_delivery,
      condition: card_condition,
      image: URL.createObjectURL(file),
    });
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmitHandler)} className={styles.form}>
        <InputText
          inputName={ADD_CARD_FORM.ELEMENT_NAME.TITLE}
          placeholder={ADD_CARD_FORM.PLACEHOLDER.TITLE}
          errorMessage={ADD_CARD_FORM.VALIDATION_ERROR_MESSAGE.TITLE}
          testId={ADD_CARD_FORM.ELEMENTS_TEST_ID}
        />
        <Select
          selectName={ADD_CARD_FORM.ELEMENT_NAME.BRAND}
          options={BRANDS}
          placeholder={ADD_CARD_FORM.PLACEHOLDER.BRAND}
          errorMessage={ADD_CARD_FORM.VALIDATION_ERROR_MESSAGE.BRAND}
          testId={ADD_CARD_FORM.ELEMENTS_TEST_ID}
        />
        <InputDate
          inputName={ADD_CARD_FORM.ELEMENT_NAME.DATE}
          errorMessage={ADD_CARD_FORM.VALIDATION_ERROR_MESSAGE.DATE}
          testId={ADD_CARD_FORM.ELEMENTS_TEST_ID}
        />
        <InputCheckbox
          inputName={ADD_CARD_FORM.ELEMENT_NAME.DELIVERY}
          labelText={DELIVERY.IS_AVAILABLE}
          testId={ADD_CARD_FORM.ELEMENTS_TEST_ID}
        />
        <InputRadio
          groupName={ADD_CARD_FORM.ELEMENT_NAME.CONDITION}
          options={[CONDITION.NEW, CONDITION.USED]}
          errorMessage={ADD_CARD_FORM.VALIDATION_ERROR_MESSAGE.CONDITION}
          testId={ADD_CARD_FORM.ELEMENTS_TEST_ID}
        />
        <InputFile
          inputName={ADD_CARD_FORM.ELEMENT_NAME.IMAGE}
          errorMessage={ADD_CARD_FORM.VALIDATION_ERROR_MESSAGE.FILE}
          testId={ADD_CARD_FORM.ELEMENTS_TEST_ID}
        />
        <button type="submit" className={buttons.button} data-testid="form-element">
          Submit
        </button>
      </form>
    </FormProvider>
  );
};

export default AddCardForm;
