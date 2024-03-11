import { Dispatch, SetStateAction, useCallback, useState } from 'react';
import { Paging } from '@models/Common';

type UsePagination<T> = {
  searchParams: T;
  paging: Paging;
  setPaging: Dispatch<SetStateAction<Paging>>;
  handleSearchSubmit: (values: T) => void;
};

const usePagination = <T extends object>(initSearchParams: T): UsePagination<T> => {
  const [searchParams, setSearchParams] = useState<T>(initSearchParams);
  const [paging, setPaging] = useState<Paging>(new Paging());

  const handleSearchSubmit = useCallback((values: T) => {
    setSearchParams(values);
    setPaging((prev) => ({ ...prev, page: 0 }));
  }, []);

  return { searchParams, paging, setPaging, handleSearchSubmit };
};

export default usePagination;
