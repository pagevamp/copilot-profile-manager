import { Checkbox, styled } from '@mui/material';

const _StyledCheckBox = styled(Checkbox)(({ theme }) => ({
  '&.MuiCheckbox-root.Mui-checked': {
    color: theme.color.base.black,
  },
  padding: 0,
  color: theme.color.borders.border,
}));

export const StyledCheckBox = ({
  checked,
  handleChange,
}: {
  checked: boolean;
  handleChange: (checked: boolean) => void;
}) => (
  <_StyledCheckBox
    disableRipple
    disableFocusRipple
    disableTouchRipple
    size="small"
    checked={checked}
    onChange={(e) => handleChange(e.target.checked)}
  />
);
