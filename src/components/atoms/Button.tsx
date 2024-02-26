import { SimpleButton } from '@/components/styled/SimpleButton';
import { Typography } from '@mui/material';
import { TypographyPropsVariantOverrides } from '@mui/material/Typography/Typography';
import { OverridableStringUnion } from '@mui/types';
import { Variant } from '@mui/material/styles/createTypography';
import Link from 'next/link';

type ButtonModes = 'button' | 'link';

interface ButtonProps {
  children: string | JSX.Element;
  typographyVariant?: OverridableStringUnion<Variant | 'inherit', TypographyPropsVariantOverrides>;
  mode?: ButtonModes;
  href?: string;
  onClick?: () => void;
}

const Button = ({ mode = 'link', children, href, typographyVariant = 'md', onClick }: ButtonProps) => {
  if (mode === 'link') {
    // Use mode link if you want Next to route to another url but also prefetch that page
    return (
      <Link href={href || '#'} style={{ textDecoration: 'none' }}>
        <SimpleButton>
          <Typography variant={typographyVariant}>{children}</Typography>
        </SimpleButton>
      </Link>
    );
  }

  // Use mode button if you have custom behaviour / don't want prefetching to work
  return (
    <SimpleButton onClick={onClick}>
      <Typography variant={typographyVariant}>{children}</Typography>
    </SimpleButton>
  );
};

export default Button;
