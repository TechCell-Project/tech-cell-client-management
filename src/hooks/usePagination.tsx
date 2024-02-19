import { Dispatch, SetStateAction, useState } from 'react';
import { Paging } from '@models/Common';

type UsePagination<T> = {
  searchParams: T | undefined;
  paging: Paging;
  setPaging: Dispatch<SetStateAction<Paging>>;
  handleSearchSubmit: (values: T) => void;
};

const usePagination = <T extends object>(): UsePagination<T> => {
  const [searchParams, setSearchParams] = useState<T>();
  const [paging, setPaging] = useState<Paging>(new Paging());

  const handleSearchSubmit = (values: T) => {
    setSearchParams(values);
    setPaging((prev) => ({ ...prev, page: 0 }));
  };

  return { searchParams, paging, setPaging, handleSearchSubmit };
};

export default usePagination;
