import { SearchIcon } from '@/icons';
import { InputAdornment, styled } from '@mui/material';
import { useState } from 'react';
import { StyledTextInput } from '../styled/StyledTextInput';

interface ISearchBar {
  value: string;
  getSearchKeyword: (keyword: string) => void;
}

const SearchBar = ({ value, getSearchKeyword }: ISearchBar) => {
  const [focused, setFocused] = useState(false);

  return (
    <StyledTextField
      value={value}
      focused={focused}
      variant="outlined"
      placeholder={focused ? 'Find in view...' : 'Search'}
      size="small"
      InputProps={{
        startAdornment: (
          <InputAdornment
            position="start"
            sx={{
              cursor: 'pointer',
            }}
          >
            <SearchIcon />
          </InputAdornment>
        ),
      }}
      autoComplete="off"
      onBlur={() => setFocused(false)}
      onFocus={() => setFocused(true)}
      onChange={(e) => getSearchKeyword(e.target.value)}
    />
  );
};

export default SearchBar;

const StyledTextField = styled(StyledTextInput, {
  shouldForwardProp: (prop) => prop !== 'focused',
})<{ focused: boolean }>(({ focused }) => ({
  width: focused ? '220px' : '80px',
  transition: 'width 0.5s',
  '& .MuiOutlinedInput-input': {
    cursor: 'pointer',
  },
}));
