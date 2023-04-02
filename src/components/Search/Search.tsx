import { useContext } from 'react';

import { TEXT } from '@constants';
import { AppContext } from '@context';

import styles from './Search.module.scss';

const Search = () => {
  const {
    search: { searchValue, setSearchValue },
  } = useContext(AppContext);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const onClear = () => {
    setSearchValue('');
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') onClear();
  };

  const inputStyles = searchValue
    ? [styles.search__input, styles.search__input_close].join(' ')
    : styles.search__input;

  return (
    <div className={styles.search}>
      {searchValue && <span className={styles.search__clear} onClick={onClear} />}
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
