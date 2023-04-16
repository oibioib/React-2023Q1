import { useState } from 'react';

import { TEXT } from '@constants';
import { storeActions, useAppDispatch, useAppSelector } from '@store';

import styles from './Search.module.scss';

const { setAppSearchValue } = storeActions.appSearch;

const Search = () => {
  const dispatch = useAppDispatch();
  const appSearchValue = useAppSelector((state) => state.appSearch.value);
  const [searchValue, setSearchValue] = useState<string>(appSearchValue);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const onClear = () => {
    setSearchValue('');
    dispatch(setAppSearchValue(''));
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      dispatch(setAppSearchValue(searchValue));
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
