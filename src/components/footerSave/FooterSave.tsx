import { Stack, Typography } from '@mui/material';
import { VariantButton1, VariantButton2 } from '../styled/VariantButton';

export const FooterSave = ({
  loading,
  handleSave,
  handleCancel,
  type,
}: {
  loading: boolean;
  handleSave: () => void;
  handleCancel: () => void;
  type: '1' | '2';
}) => {
  return (
    <Stack
      sx={{
        width: '100%',
        position: 'fixed',
        bottom: 0,
        left: 0,
        borderTop: (theme) => `1px solid ${theme.color.borders.border}`,
        padding: '16px 24px',
        background: '#fff',
        alignItems: 'flex-end',
        zIndex: 9999,
      }}
    >
      <Stack direction="row" columnGap={5}>
        <VariantButton1 onClick={handleCancel}>
          <Typography variant="md">Cancel</Typography>
        </VariantButton1>
        <VariantButton2
          onClick={handleSave}
          sx={{
            background: type === '1' ? '#212B36' : '#5e57e3',
            border: `1px solid ${type === '1' ? '#212B36' : '#5e57e3'}`,
          }}
        >
          {loading ? (
            <Typography
              variant="md"
              sx={{
                color: '#fff',
              }}
            >
              Saving...
            </Typography>
          ) : (
            <Typography
              variant="md"
              sx={{
                color: '#fff',
              }}
            >
              Save changes
            </Typography>
          )}
        </VariantButton2>
      </Stack>
    </Stack>
  );
};
