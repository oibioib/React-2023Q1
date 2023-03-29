import { Component } from 'react';

import { ErrorMessage } from '@components';
import { IMAGE_TYPES, TEXT } from '@constants';
import { validateForm } from '@helpers';
import formElements from '@scss/components/form-elements.module.scss';

import styles from './InputFile.module.scss';

interface InputFileProps {
  forwardedRef: React.RefObject<HTMLInputElement>;
  errorMessage: string;
  isValid: boolean;
}
interface InputFileState {
  message: string;
  image: File | null;
}

class InputFile extends Component<InputFileProps, InputFileState> {
  constructor(props: InputFileProps) {
    super(props);

    this.state = {
      message: TEXT.MESSAGES.NO_FILE,
      image: null,
    };
  }

  componentDidUpdate(_prevProps: InputFileProps, prevState: InputFileState) {
    if (!this.props.forwardedRef.current?.files?.length && prevState.image) {
      this.setState({
        message: TEXT.MESSAGES.NO_FILE,
        image: null,
      });
    }
  }

  onFileSelect = () => {
    const files = this.props.forwardedRef.current?.files;

    if (files) {
      const [fileSelected] = files;
      this.setState({
        message: fileSelected.name,
        image: validateForm.image(fileSelected.type, IMAGE_TYPES) ? fileSelected : null,
      });
    }
  };

  previewImage = () => {
    const { image } = this.state;
    return image ? URL.createObjectURL(image) : undefined;
  };

  render() {
    const { forwardedRef, errorMessage, isValid } = this.props;
    const { message, image } = this.state;
    return (
      <div data-testid="form-element" className={styles['input-file']}>
        <input
          ref={forwardedRef}
          type="file"
          name="image"
          id="image"
          accept="image/*"
          className={styles['input-file__hidden']}
          onChange={this.onFileSelect}
        />
        <label
          htmlFor="image"
          className={
            (isValid && formElements.input) ||
            [formElements.input, formElements.input_warning].join(' ')
          }
        >
          {TEXT.BUTTONS.SELECT_IMAGE}
        </label>
        <div className={styles['input-file__message']}>{message}</div>
        {image && <img src={this.previewImage()} className={styles['input-file__image']} />}
        {!isValid && <ErrorMessage message={errorMessage} />}
      </div>
    );
  }
}

export default InputFile;
