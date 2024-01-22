import { Box, Popper, Stack, Typography } from '@mui/material';
import React from 'react';

export const HistoryCellRenderer = ({ value }: { value: { value: string; showDot: boolean } }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMouseEnter = (event: React.MouseEvent<HTMLElement>) => {
    if (value.showDot) {
      setAnchorEl(anchorEl ? null : event.currentTarget);
    }
  };

  const handleMouseLeave = (event: React.MouseEvent<HTMLElement>) => {
    if (value.showDot && anchorEl === event.currentTarget) {
      setAnchorEl(null);
    }
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;

  return (
    <Box position="relative">
      {value.showDot && (
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
