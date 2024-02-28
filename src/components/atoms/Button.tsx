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
  parentRouteOnClick?: AvailablePortalRoutes;
  typographyVariant?: OverridableStringUnion<Variant | 'inherit', TypographyPropsVariantOverrides>;
  onClick?: () => void;
}

const Button = ({ children, parentRouteOnClick, onClick, typographyVariant = 'md' }: ButtonProps) => {
  const handleClick =
    onClick || (parentRouteOnClick && (() => window.parent.postMessage({ type: 'history.push', parentRouteOnClick }, '*')));

  return (
    <SimpleButton onClick={handleClick}>
      <Typography variant={typographyVariant}>{children}</Typography>
    </SimpleButton>
  );
};

export default Button;
