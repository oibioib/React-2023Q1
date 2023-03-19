import { Component } from 'react';

import { Cards, Search } from '@components';

import cards from '../../data/cards.json';

class MainPage extends Component {
  render() {
    return (
      <>
        <Search />
        <Cards cards={cards} />
      </>
    );
  }
}

export default MainPage;
