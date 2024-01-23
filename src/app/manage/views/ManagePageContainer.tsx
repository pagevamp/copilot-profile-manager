'use client';

import { MultiSelect } from '@/components/multiSelect/MultiSelect';
import { StyledTextInput } from '@/components/styled/StyledTextInput';
import { Chip, Stack, Typography, styled } from '@mui/material';

export const ManagePageContainer = () => {
  return (
    <Stack
      direction="column"
      sx={{
        padding: { xs: 4, sm: 6 },
        rowGap: 6,
        border: (theme) => `1px solid ${theme.color.borders.border}`,
        borderRadius: (theme) => theme.shape.radius100,
        mt: 4,
      }}
    >
      <InputContainer>
        <Typography variant="md">Phone number</Typography>
        <StyledTextInput variant="outlined" padding="8px 12px" />
      </InputContainer>
      <InputContainer>
        <Typography variant="md">Website</Typography>
        <StyledTextInput variant="outlined" padding="8px 12px" />
      </InputContainer>
      <InputContainer>
        <Typography variant="md">Website</Typography>
        <StyledTextInput variant="outlined" padding="8px 12px" />
      </InputContainer>
      <InputContainer>
        <MultiSelect<{ name: string }> data={data} chipColor="rgb(0, 0, 255)" nameField={(item) => item.name} />
      </InputContainer>
    </Stack>
  );
};

const InputContainer = styled(Stack)({
  flexDirection: 'column',
  rowGap: 1.33,
});

const data = [{ name: 'Option 1' }, { name: 'Option 2' }, { name: 'Option 3' }, { name: 'Option 4' }, { name: 'Option 5' }];
