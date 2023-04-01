import { Component } from 'react';

import { AddCardForm, Alert, Cards } from '@components';
import { ALERT } from '@constants';
import { Card } from 'components/types';

import styles from './FormPage.module.scss';

interface FormPageState {
  isAllert: boolean;
  cards: Card[];
}

class FormPage extends Component<Record<string, never>, FormPageState> {
  constructor(props: Record<string, never>) {
    super(props);

    this.state = {
      isAllert: false,
      cards: [],
    };
  }

  onSubmit = (card: Card) => {
    this.setState((state) => ({ cards: [...state.cards, card], isAllert: true }));
    setTimeout(() => {
      this.setState({ isAllert: false });
    }, ALERT.DURATION_MS);
  };

  render() {
    const { isAllert, cards } = this.state;
    return (
      <>
        {isAllert && (
          <Alert message={ALERT.MESSAGES.CARD_SUCCESS} backgroundColor={ALERT.COLORS.SUCCESS} />
        )}
        <div className={styles.form_wrapper}>
          <AddCardForm onSubmit={this.onSubmit} />
        </div>
        <Cards cards={cards} />
      </>
    );
  }
}

export default FormPage;
