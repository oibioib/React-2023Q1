import { Component } from 'react';

import { STORAGE_KEYS, TEXT } from '@constants';

import styles from './Search.module.scss';

export interface SearchState {
  searchValue: string;
}

class Search extends Component<Record<string, never>, SearchState> {
  state = {
    searchValue: localStorage.getItem(STORAGE_KEYS.SEARCH_VALUE) ?? '',
  };

  componentWillUnmount() {
    localStorage.setItem(STORAGE_KEYS.SEARCH_VALUE, this.state.searchValue);
  }

  setSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchValue: e.target.value });
  };

  render() {
    const {
      setSearchValue,
      state: { searchValue },
    } = this;

    return (
      <div className={styles.search}>
        <input
          data-testid="search"
          className={styles.search__input}
          type="text"
          placeholder={TEXT.PLACEHOLDERS.SEARCH}
          value={searchValue}
          onChange={setSearchValue}
        />
      </div>
    );
  }
}

export default Search;
