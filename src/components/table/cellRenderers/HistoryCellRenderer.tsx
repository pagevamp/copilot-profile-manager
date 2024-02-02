import { useAppState } from '@/hooks/useAppState';
import { Box, CircularProgress, Popper, Stack, Typography } from '@mui/material';
import React, { useState } from 'react';

export const HistoryCellRenderer = ({ value }: { value: { row: any; key: string } }) => {
  const appState = useAppState();

  const [loading, setLoading] = useState(false);

  const [updateHistory, setUpdateHistory] = useState<any>([]);

  const data = value.row[value.key];

  const clientId = value.row.client.id;
  const lastUpdated = value.row.lastUpdated;
  const token = appState?.token;
  const key = value.row[value.key].key;

  const showDot = data.isChanged;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const fetchHistory = async () => {
    setLoading(true);
    const res = await fetch(
      `/api/profile-update-history?token=${token}&clientId=${clientId}&key=${key}&lastUpdated=${lastUpdated}`,
    );
    const data = await res.json();
    setUpdateHistory(data);
    setLoading(false);
  };

  const handleMouseEnter = (event: React.MouseEvent<HTMLElement>) => {
    if (showDot) {
      setAnchorEl(anchorEl ? null : event.currentTarget);
      fetchHistory();
    }
  };

  const handleMouseLeave = (event: React.MouseEvent<HTMLElement>) => {
    if (showDot && anchorEl === event.currentTarget) {
      setUpdateHistory([]);
      setAnchorEl(null);
    }
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;

  if (data.value === null) {
    return null;
  }

  console.log(updateHistory);

  if (data.type === 'multiSelect') {
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
              minWidth: '40px',
            }}
          >
            <Typography variant="bodyMd">&#x2022;</Typography>

            <Typography variant="bodySm" fontWeight={500}>
              {data.value ? data.value[0].label : ''}
            </Typography>
          </Stack>

          <Typography variant="bodyMd">{data.value.length > 1 && `+ ${data.value.length - 1}`}</Typography>
        </Stack>
        <Popper id={id} open={open} anchorEl={anchorEl}>
          {loading ? <CircularProgress size={20} color="inherit" /> : <HistoryList updateHistory={updateHistory} />}
        </Popper>
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
      <Typography variant="bodyMd">{data.value}</Typography>

      <Popper id={id} open={open} anchorEl={anchorEl}>
        {loading ? <CircularProgress size={20} color="inherit" /> : <HistoryList updateHistory={updateHistory} />}
      </Popper>
    </Box>
  );
};

const HistoryList = ({ updateHistory }: { updateHistory: any }) => {
  console.log(updateHistory);
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
      <Stack direction="column" rowGap={3}>
        {updateHistory.map((history: any, key: number) => {
          if (history.type === 'multiSelect') {
            return (
              <Stack key={key} direction="row" alignItems="center" columnGap={3}>
                <Typography variant="bodySm">&#x2022;</Typography>
                <Stack direction="row" columnGap={2}>
                  {history.value.map((el: any, key: number) => {
                    return (
                      <Stack
                        key={key}
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
                          minWidth: '40px',
                        }}
                      >
                        <Typography variant="bodyMd">&#x2022;</Typography>

                        <Typography variant="bodySm" fontWeight={500}>
                          {el.label}
                        </Typography>
                      </Stack>
                    );
                  })}
                </Stack>
              </Stack>
            );
          }
          return (
            <Typography variant="bodySm" key={key}>
              <li>{history.value}</li>
            </Typography>
          );
        })}
      </Stack>
    </Box>
  );
};
