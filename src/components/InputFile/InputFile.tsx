import { Component } from 'react';

import { ErrorMessage } from '@components';
import { TEXT } from '@constants';

import styles from './InputFile.module.scss';

interface InputFileProps {
  forwardedRef: React.RefObject<HTMLInputElement>;
  errorMessage: string;
  isValid: boolean;
}
interface InputFileState {
  message: string;
}

class InputFile extends Component<InputFileProps, InputFileState> {
  constructor(props: InputFileProps) {
    super(props);

    this.state = {
      message: TEXT.MESSAGES.NO_FILE,
    };
  }

  onFileSelect = () => {
    const files = this.props.forwardedRef.current?.files;

    if (files) {
      const [fileSelected] = files;
      this.setState({ message: fileSelected.name });
    }
  };

  render() {
    const { forwardedRef, errorMessage, isValid } = this.props;
    return (
      <div data-testid="form-element" className={styles.inputfile}>
        <input
          ref={forwardedRef}
          type="file"
          name="image"
          id="image"
          accept="image/*"
          className={styles.inputfile__hidden}
          onChange={this.onFileSelect}
        />
        <label htmlFor="image">{TEXT.BUTTONS.SELECT_IMAGE}</label>
        <div className={styles.inputfile__message}>{this.state.message}</div>
        {!isValid && <ErrorMessage message={errorMessage} />}
      </div>
    );
  }
}

export default InputFile;
