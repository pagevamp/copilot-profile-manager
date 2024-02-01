'use client';

import { Box, Stack, Typography, Divider } from '@mui/material';
import { StyledCheckBox } from '../styled/StyledCheckbox';
import { useAppState } from '@/hooks/useAppState';
import { iconsTypeMap } from './iconsTypeMap';

export const CustomFieldAccessTable = () => {
  const appState = useAppState();

  const updateCustomFieldAccess = (checked: boolean, permission: string, id: string) => {
    let customField = appState?.mutableCustomFieldAccess.find((el: any) => el.id === id);
    if (checked) {
      if (permission === 'VIEW') {
        customField = {
          ...customField,
          permission: customField.permission.includes('VIEW') ? customField.permission : [...customField.permission, 'VIEW'],
        };
      }
      if (permission === 'EDIT') {
        customField = {
          ...customField,
          permission: customField.permission.includes('EDIT') ? customField.permission : [...customField.permission, 'EDIT'],
        };
      }
    }
    if (!checked) {
      if (permission === 'VIEW') {
        customField = {
          ...customField,
          permission: customField.permission.includes('VIEW') ? [] : customField.permission,
        };
      }
      if (permission === 'EDIT') {
        customField = {
          ...customField,
          permission: customField.permission.includes('EDIT')
            ? customField.permission.filter((item: string) => item !== 'EDIT')
            : customField.permission,
        };
      }
    }
    let indexToUpdate = appState?.mutableCustomFieldAccess.findIndex((item: any) => item.id === id);
    let allCustomFields = appState?.mutableCustomFieldAccess;
    allCustomFields[indexToUpdate] = customField;
    appState?.setAppState((prev) => ({ ...prev, mutableCustomFieldAccess: allCustomFields }));
  };

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
      {appState?.mutableCustomFieldAccess.map((field: any, key: number) => {
        return (
          <Stack direction="row" justifyContent="space-between" alignItems="center" p="8px 0px" key={key}>
            <Box minWidth="215px">
              <Stack direction="row" alignItems="center" columnGap={2}>
                {iconsTypeMap[field.type]}
                <Typography variant="bodyMd">{field.name}</Typography>
              </Stack>
            </Box>
            <Stack direction="row" columnGap={12} alignItems="center">
              <StyledCheckBox
                checked={field.permission.includes('VIEW')}
                handleChange={(checked) => {
                  updateCustomFieldAccess(checked, 'VIEW', field.id);
                }}
              />
              {field.permission.includes('VIEW') ? (
                <StyledCheckBox
                  checked={field.permission.includes('EDIT')}
                  handleChange={(checked) => {
                    updateCustomFieldAccess(checked, 'EDIT', field.id);
                  }}
                />
              ) : (
                <Stack
                  direction="row"
                  justifyContent="end"
                  sx={{
                    width: '20px',
                  }}
                >
                  <Typography variant="sm">-</Typography>
                </Stack>
              )}
            </Stack>
          </Stack>
        );
      })}
    </>
  );
};
