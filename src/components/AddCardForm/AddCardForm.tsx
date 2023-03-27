import React, { createRef } from 'react';

import { InputCheckbox, InputDate, InputFile, InputRadio, InputText, Select } from '@components';
import { BRANDS, CONDITION, DELIVERY, FORM_ERROR_MESSAGE, IMAGE_FORMATS, TEXT } from '@constants';
import { getId, validateForm } from '@helpers';
import elements from '@scss/layouts/elements.module.scss';
import { CardItem } from 'components/types';

import styles from './AddCardForm.module.scss';

interface AddCardFormProps {
  onSubmit: (card: CardItem) => void;
}

interface AddCardFormState {
  isTitleValid: boolean;
  isBrandValid: boolean;
  isDateValid: boolean;
  isConditionValid: boolean;
  isImageValid: boolean;
}

interface AddCardFormRefs {
  form: React.RefObject<HTMLFormElement>;
  title: React.RefObject<HTMLInputElement>;
  brand: React.RefObject<HTMLSelectElement>;
  date: React.RefObject<HTMLInputElement>;
  delivery: React.RefObject<HTMLInputElement>;
  conditionNew: React.RefObject<HTMLInputElement>;
  conditionUsed: React.RefObject<HTMLInputElement>;
  image: React.RefObject<HTMLInputElement>;
}

class AddCardForm extends React.Component<AddCardFormProps, AddCardFormState> {
  formRefs: AddCardFormRefs;

  constructor(props: AddCardFormProps) {
    super(props);

    this.state = {
      isTitleValid: true,
      isBrandValid: true,
      isDateValid: true,
      isConditionValid: true,
      isImageValid: true,
    };

    this.formRefs = {
      form: createRef(),
      title: createRef(),
      brand: createRef(),
      date: createRef(),
      delivery: createRef(),
      conditionNew: createRef(),
      conditionUsed: createRef(),
      image: createRef(),
    };
  }

  validateCard = () => {
    const { title, brand, date, conditionNew, conditionUsed, image } = this.formRefs;
    const cardFields: AddCardFormState = {
      isTitleValid: validateForm.title(title.current?.value ?? ''),
      isBrandValid: validateForm.brand(brand.current?.value ?? '', BRANDS),
      isDateValid: validateForm.date(date.current?.value ?? ''),
      isConditionValid: conditionNew.current!.checked || conditionUsed.current!.checked,
      isImageValid: validateForm.image(image.current?.value ?? '', IMAGE_FORMATS),
    };

    this.setState(cardFields);
    return Object.values(cardFields).every((field) => field === true);
  };

  getValidCard = () => {
    const { title, brand, date, conditionNew, delivery, image } = this.formRefs;
    const condition = conditionNew.current?.checked ? CONDITION.NEW : CONDITION.USED;
    const [cardImage] = image.current!.files!;
    const cardImageUrl = URL.createObjectURL(cardImage);

    return {
      id: getId(),
      title: title.current!.value,
      brand: brand.current!.value,
      date: date.current!.value,
      delivery: delivery.current!.checked,
      condition,
      image: cardImageUrl,
    };
  };

  onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (this.validateCard()) {
      this.props.onSubmit(this.getValidCard());
      this.formRefs.form.current?.reset();
    }
  };

  render() {
    const { form, title, brand, date, delivery, conditionNew, conditionUsed, image } =
      this.formRefs;
    const { isTitleValid, isBrandValid, isDateValid, isConditionValid, isImageValid } = this.state;

    return (
      <>
        <form onSubmit={this.onSubmitHandler} ref={form} className={styles.form}>
          <InputText
            forwardedRef={title}
            errorMessage={FORM_ERROR_MESSAGE.TITLE}
            isValid={isTitleValid}
            placeholder={TEXT.PLACEHOLDERS.FORM_TITLE}
          />
          <Select
            forwardedRef={brand}
            errorMessage={FORM_ERROR_MESSAGE.BRAND}
            isValid={isBrandValid}
            options={BRANDS}
          />
          <InputDate
            forwardedRef={date}
            errorMessage={FORM_ERROR_MESSAGE.DATE}
            isValid={isDateValid}
          />
          <InputCheckbox forwardedRef={delivery} labelText={DELIVERY.IS_AVAILABLE} />
          <InputRadio
            groupName="condition"
            errorMessage={FORM_ERROR_MESSAGE.CONDITION}
            isValid={isConditionValid}
            options={[
              {
                id: CONDITION.NEW,
                title: CONDITION.NEW,
                forwardedRef: conditionNew,
              },
              {
                id: CONDITION.USED,
                title: CONDITION.USED,
                forwardedRef: conditionUsed,
              },
            ]}
          />
          <InputFile
            forwardedRef={image}
            errorMessage={FORM_ERROR_MESSAGE.FILE}
            isValid={isImageValid}
          />

          <button type="submit" className={elements.button}>
            Submit
          </button>
        </form>
      </>
    );
  }
}

export default AddCardForm;
