import { SearchIcon } from '@/icons';
import { InputAdornment, TextField } from '@mui/material';
import { useState } from 'react';

const SearchBar = () => {
  const [focused, setFocused] = useState(false);

  return (
    <TextField
      variant="outlined"
      placeholder={focused ? 'Find in view...' : 'Search'}
      size="small"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
      autoComplete="off"
      sx={(theme) => ({
        width: focused ? '220px' : '80px',
        transition: 'width 0.5s',
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
      })}
      onBlur={() => setFocused(false)}
      onFocus={() => setFocused(true)}
    />
  );
};

export default SearchBar;
