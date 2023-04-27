import { useMemo } from 'react';

import { ErrorMessage, Loader, MainCards, Search } from '@components';
import { getErrorMessage } from '@helpers';
import { storeActions, useAppSelector } from '@store';

const { useGetPhotosQuery } = storeActions.unsplashApi;

const MainPage = () => {
  const appSearchValue = useAppSelector((state) => state.appSearch.value);
  const { data, isFetching, isError, isLoading, error } = useGetPhotosQuery(appSearchValue);

  const dataToRender = useMemo(() => {
    if (isFetching || isLoading) return <Loader />;
    if (isError) return <ErrorMessage message={getErrorMessage(error)} />;
    if (data) return <MainCards cards={data} />;
  }, [data, isLoading, isFetching, isError, error]);

  return (
    <>
      <Search />
      {dataToRender}
    </>
  );
};

export default MainPage;
