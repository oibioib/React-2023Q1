import { useContext } from 'react';

import { STORAGE_KEYS, TEXT } from '@constants';
import { MainPageContext } from '@context';

import styles from './Search.module.scss';

const Search = () => {
  const { searchValue, setSearchValue, doSearch } = useContext(MainPageContext);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const onClear = () => {
    setSearchValue('');
    doSearch('');
    localStorage.setItem(STORAGE_KEYS.SEARCH_VALUE, '');
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      localStorage.setItem(STORAGE_KEYS.SEARCH_VALUE, searchValue);
      doSearch(searchValue);
    }
    if (e.key === 'Escape') onClear();
  };

  const inputStyles = searchValue
    ? [styles.search__input, styles.search__input_close].join(' ')
    : styles.search__input;

  return (
    <div className={styles.search}>
      {searchValue && (
        <span className={styles.search__clear} onClick={onClear} data-testid="search-clear" />
      )}
      <input
        data-testid="search"
        value={searchValue}
        className={inputStyles}
        type="text"
        placeholder={TEXT.PLACEHOLDERS.SEARCH}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
    </div>
  );
};

export default Search;
