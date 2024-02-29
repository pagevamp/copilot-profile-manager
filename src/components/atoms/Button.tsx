'use client';

import { SimpleButton } from '@/components/styled/SimpleButton';
import { Typography } from '@mui/material';
import { TypographyPropsVariantOverrides } from '@mui/material/Typography/Typography';
import { OverridableStringUnion } from '@mui/types';
import { Variant } from '@mui/material/styles/createTypography';
import { ReactNode } from 'react';

interface ButtonProps {
  children: string | ReactNode;
  typographyVariant?: OverridableStringUnion<Variant | 'inherit', TypographyPropsVariantOverrides>;
  handleClick?: () => void;
}

const Button = ({ children, handleClick, typographyVariant = 'md' }: ButtonProps) => {
  return (
    <SimpleButton onClick={handleClick}>
      <Typography variant={typographyVariant}>{children}</Typography>
    </SimpleButton>
  );
};

export default Button;
