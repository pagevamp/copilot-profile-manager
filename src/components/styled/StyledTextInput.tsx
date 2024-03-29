'use client';

import { TextField, styled } from '@mui/material';

export const StyledTextInput = styled(TextField, {
  shouldForwardProp: (prop) => prop !== 'padding',
})<{ padding?: string }>(({ padding, theme }) => ({
  '& .MuiInputBase-root': {
    paddingLeft: '8px',
  },
  '& .MuiOutlinedInput-input': {
    padding: padding ? padding : '3px 8px 3px 0px',
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
