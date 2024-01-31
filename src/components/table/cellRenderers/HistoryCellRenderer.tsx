import { Box, Popper, Stack, Typography } from '@mui/material';
import React from 'react';

export const HistoryCellRenderer = ({
  value,
}: {
  value: { name: string; type: string; key: string; value: any; isChanged: boolean };
}) => {
  const showDot = value.isChanged;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMouseEnter = (event: React.MouseEvent<HTMLElement>) => {
    if (showDot) {
      setAnchorEl(anchorEl ? null : event.currentTarget);
    }
  };

  const handleMouseLeave = (event: React.MouseEvent<HTMLElement>) => {
    if (showDot && anchorEl === event.currentTarget) {
      setAnchorEl(null);
    }
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;

  if (value.value === null) {
    return null;
  }

  if (value.type === 'multiSelect') {
    return (
      <Box position="relative">
        {showDot && (
          <Typography
            aria-describedby={id}
            variant="bodyMd"
            fontSize={20}
            sx={{
              position: 'absolute',
              left: -15,
              top: 0,
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            &#x2022;
          </Typography>
        )}
        <Stack
          direction="row"
          alignItems="center"
          sx={{
            marginTop: '10px',
          }}
          columnGap={'2px'}
        >
          <Stack
            direction="row"
            alignItems="center"
            sx={{
              padding: '4px 8px',
              border: `1px solid rgba(255, 120, 0, 1)`,
              // backgroundColor: value.value[0].color,
              backgroundColor: 'rgba(255, 120, 0, 0.3)',
              color: 'rgba(255, 120, 0, 1)',
              fontWeight: '600',
              borderRadius: '35px',
              width: 'fit-content',
            }}
          >
            <Typography variant="bodyMd">&#x2022;</Typography>

            <Typography variant="bodySm" fontWeight={500}>
              {value.value ? value.value[0].label : ''}
            </Typography>
          </Stack>

          <Typography variant="bodyMd">+{value.value.length - 1}</Typography>
        </Stack>
      </Box>
    );
  }

  return (
    <Box position="relative">
      {showDot && (
        <Typography
          aria-describedby={id}
          variant="bodyMd"
          fontSize={20}
          sx={{
            position: 'absolute',
            left: -15,
            top: 10,
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          &#x2022;
        </Typography>
      )}
      <Typography variant="bodyMd">{value.value}</Typography>

      <Popper id={id} open={open} anchorEl={anchorEl}>
        <HistoryList />
      </Popper>
    </Box>
  );
};

const HistoryList = () => {
  return (
    <Box
      sx={(theme) => ({
        border: `1px solid ${theme.color.borders.border}`,
        borderRadius: theme.shape.radius100,
        backgroundColor: theme.color.base.white,
        boxShadow: '0px 8px 24px 0px rgba(0, 0, 0, 0.12)',
        padding: 4,
        minWidth: '200px',
      })}
    >
      <Typography variant="sm">Update history</Typography>
      <Typography variant="bodySm">
        <li>403-33-10-33</li>
      </Typography>
      <Typography variant="bodySm">
        <li>403-33-10-33</li>
      </Typography>
      <Typography variant="bodySm">
        <li>Empty</li>
      </Typography>
    </Box>
  );
};
