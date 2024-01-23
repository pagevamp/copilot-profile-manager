'use client';

import { styled, Box } from '@mui/material';

export const SimpleButton = styled(Box)(({ theme }) => ({
  padding: '4px 8px',
  borderRadius: theme.shape.radius100,
  border: `1px solid ${theme.color.borders.border}`,
  background: theme.color.base.white,
  cursor: 'pointer',
}));
