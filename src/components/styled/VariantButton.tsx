'use client';

import { styled, Box } from '@mui/material';

export const VariantButton1 = styled(Box)(({ theme }) => ({
  padding: '4px 8px',
  borderRadius: theme.shape.radius400,
  border: `1px solid ${theme.color.borders.border}`,
  background: theme.color.base.white,
  cursor: 'pointer',
  color: '#212B36',
}));

export const VariantButton2 = styled(Box)(({ theme }) => ({
  padding: '4px 8px',
  border: '1px solid #212B36',
  borderRadius: theme.shape.radius400,
  cursor: 'pointer',
  background: '#212B36',
  color: '#fff',
}));
