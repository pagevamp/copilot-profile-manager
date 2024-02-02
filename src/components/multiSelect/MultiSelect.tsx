import { Autocomplete, Chip } from '@mui/material';
import { StyledTextInput } from '../styled/StyledTextInput';
import { ClearOutlined, FiberManualRecord } from '@mui/icons-material';

interface IMultiSelect<T extends object> {
  data: T[];
  chipColor: string;
  nameField: (item: T) => string; // Function to extract the name from the item
  value: any;
  getSelectedValue: (value: any) => void;
}

export const MultiSelect = <T extends object>({ data, chipColor, nameField, value, getSelectedValue }: IMultiSelect<T>) => {
  const reducedOpacityColor = (opacity: number) => {
    const match = chipColor.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
    if (match) {
      const [, r, g, b] = match;
      return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    }
    return chipColor;
  };

  return (
    <Autocomplete
      onChange={(event: any, newValue: any) => {
        getSelectedValue(newValue);
      }}
      value={value}
      multiple
      id="tags-outlined"
      options={data}
      getOptionLabel={(option: T) => nameField(option)}
      filterSelectedOptions
      autoHighlight
      renderInput={(params) => <StyledTextInput {...params} />}
      renderTags={(value: T[], getTagProps) =>
        value.map((option: T, index: number) => (
          <Chip
            variant="outlined"
            label={nameField(option)}
            {...getTagProps({ index })}
            key={index}
            deleteIcon={<ClearOutlined />}
            avatar={<FiberManualRecord />}
            sx={{
              '&.MuiChip-root': {
                borderColor: reducedOpacityColor(0.3),
                border: '2px solid',
                background: reducedOpacityColor(0.1),
                color: reducedOpacityColor(0.9),
                fontWeight: 500,
              },
              '& .MuiChip-deleteIcon': {
                color: 'rgba(0, 0, 255, 1)',
              },
              '& .MuiChip-avatar': {
                color: 'rgba(0, 0, 255, 1)',
              },
            }}
          />
        ))
      }
      sx={{
        '& .MuiOutlinedInput-root': {
          paddingTop: 1,
          paddingBottom: 1,
        },
      }}
    />
  );
};
