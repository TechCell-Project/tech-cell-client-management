import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { Search, SearchIconWrapper, StyledInputBase } from '@styled-mui/search';

const SearchHeader = () => {
  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase placeholder="Tìm kiếm ..." inputProps={{ 'aria-label': 'search' }} />
    </Search>
  );
};

export default SearchHeader;
