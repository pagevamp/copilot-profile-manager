'use client';

import { SimpleButton } from '@/components/styled/SimpleButton';
import { Typography } from '@mui/material';
import { TypographyPropsVariantOverrides } from '@mui/material/Typography/Typography';
import { OverridableStringUnion } from '@mui/types';
import { Variant } from '@mui/material/styles/createTypography';
import { AvailablePortalRoutes, PortalRoutes } from '@/types/copilotPortal';
import { ReactNode } from 'react';

interface ButtonProps {
  children: string | ReactNode;
  route?: AvailablePortalRoutes;
  typographyVariant?: OverridableStringUnion<Variant | 'inherit', TypographyPropsVariantOverrides>;
  onClick?: () => void;
}

const Button = ({ children, route, onClick, typographyVariant = 'md' }: ButtonProps) => {
  const handleClick = onClick || (route && (() => window.parent.postMessage({ type: 'history.push', route }, '*')));

  return (
    <SimpleButton onClick={handleClick}>
      <Typography variant={typographyVariant}>{children}</Typography>
    </SimpleButton>
  );
};

export default Button;
