import { Box, Stack, Typography, Divider } from '@mui/material';
import { StyledCheckBox } from '../styled/StyledCheckbox';
import { useState } from 'react';

interface ICustomFieldAccessTable {
  customFields: {
    id: string;
    icon: any;
    field: string;
    view: boolean;
    edit: boolean;
  }[];
}

export const CustomFieldAccessTable = ({ customFields }: ICustomFieldAccessTable) => {
  const [data, setData] = useState<
    {
      id: string;
      icon: any;
      field: string;
      view: boolean;
      edit: boolean;
    }[]
  >(customFields);

  return (
    <>
      <Stack direction="row" justifyContent="space-between" alignItems="center" pb={2}>
        <Box minWidth="215px">
          <Typography variant="bodySm">Field</Typography>
        </Box>
        <Stack direction="row" columnGap={12}>
          <Typography variant="bodySm">View</Typography>
          <Typography variant="bodySm">Edit</Typography>
        </Stack>
      </Stack>
      <Divider flexItem />
      {data.map((field, key) => {
        return (
          <Stack direction="row" justifyContent="space-between" alignItems="center" p="8px 0px" key={key}>
            <Box minWidth="215px">
              <Stack direction="row" alignItems="center" columnGap={2}>
                {field.icon}
                <Typography variant="bodyMd">{field.field}</Typography>
              </Stack>
            </Box>
            <Stack direction="row" columnGap={12} alignItems="center">
              <StyledCheckBox checked={field.view} handleChange={(c) => {}} />
              <StyledCheckBox checked={field.edit} handleChange={(c) => {}} />
            </Stack>
          </Stack>
        );
      })}
    </>
  );
};
