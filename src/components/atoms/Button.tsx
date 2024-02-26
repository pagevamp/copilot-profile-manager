'use client';

import { SimpleButton } from '@/components/styled/SimpleButton';
import { Typography } from '@mui/material';
import { TypographyPropsVariantOverrides } from '@mui/material/Typography/Typography';
import { OverridableStringUnion } from '@mui/types';
import { Variant } from '@mui/material/styles/createTypography';
import Link from 'next/link';

interface ButtonProps {
  children: string | JSX.Element;
  route?: PortalRoutes;
  typographyVariant?: OverridableStringUnion<Variant | 'inherit', TypographyPropsVariantOverrides>;
  onClick?: () => void;
}

const Button = ({ children, route, onClick, typographyVariant = 'md' }: ButtonProps) => {
  onClick = onClick || (() => window.parent.postMessage({ type: 'history.push', route: route || '#' }, '*'));

  return (
    <SimpleButton onClick={onClick}>
      <Typography variant={typographyVariant}>{children}</Typography>
    </SimpleButton>
  );
};

export default Button;
