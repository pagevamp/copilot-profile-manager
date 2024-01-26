import { SwitchIconSelected, SwitchIconUnselected } from '@/icons';
import { Box } from '@mui/material';
import { useState } from 'react';

export const Switch = ({ selected, getValue }: { selected: boolean; getValue: (selected: boolean) => void }) => {
  const [_selected, setSelected] = useState(selected);

  return (
    <Box
      onClick={() => {
        getValue(!_selected);
        setSelected((prev) => !prev);
      }}
      sx={{ cursor: 'pointer' }}
    >
      {_selected ? <SwitchIconSelected /> : <SwitchIconUnselected />}
    </Box>
  );
};
