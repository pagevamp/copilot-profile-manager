import { SearchIcon } from '@/icons';
import { InputAdornment, TextField, styled } from '@mui/material';
import { useState } from 'react';

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

const StyledTextField = styled(TextField, {
  shouldForwardProp: (prop) => prop !== 'focused',
})<{ focused: boolean }>(({ focused, theme }) => ({
  width: focused ? '220px' : '80px',
  transition: 'width 0.5s',
  '& .MuiInputBase-root': {
    paddingLeft: '8px',
  },
  '& .MuiOutlinedInput-input': {
    cursor: 'pointer',
    padding: '3px 8px 3px 0px',
  },
  '& label.Mui-focused': {
    color: theme.color.base.black,
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: theme.color.borders.border,
    },
    '&:hover fieldset': {
      borderColor: theme.color.borders.border,
    },
    '&.Mui-focused fieldset': {
      border: `1px solid ${theme.color.base.black}`,
    },
  },
  input: {
    '&::placeholder': {
      opacity: 1,
      fontSize: '13px',
    },
  },
}));
