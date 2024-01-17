import { SearchIcon } from '@/icons';
import { InputAdornment, TextField } from '@mui/material';

const SearchBar = () => {
  return (
    <TextField
      variant="outlined"
      placeholder="Search"
      size="small"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  );
};

export default SearchBar;
