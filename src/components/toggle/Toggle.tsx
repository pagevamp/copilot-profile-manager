import { ToggleIconSelected, ToggleIconUnselected } from '@/icons';
import { Stack } from '@mui/material';

export const Toggle = ({ handleClick, selected }: { handleClick: () => void; selected: boolean }) => {
  return (
    <Stack
      direction="row"
      onClick={() => handleClick()}
      sx={{
        border: (theme) => `1px solid ${theme.color.borders.borderHover}`,
        padding: 2,
        borderRadius: (theme) => theme.shape.radius050,
      }}
    >
      <Stack direction="column">{selected ? <ToggleIconSelected /> : <ToggleIconUnselected />}</Stack>
    </Stack>
  );
};
