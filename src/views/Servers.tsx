import { useEffect } from 'react';
import { getDebugState } from '@/util/dbg';
import AppLayout from '@/layouts/AppLayout';
import { defineComponentLayout } from '@/util/defineLayout';
import { useMainSelector } from '@/hooks/useSelector';
import { loopCb } from '@/util/util';
import { getSocket } from '@/socket/instance';
import { Box, Button, Typography } from '@mui/material';
import { getColors } from '@/util/theme';

const colors = getColors();

function Servers() {
  const socket = getSocket();
  const { serverList } = useMainSelector();

  useEffect(() => {
    if (socket)
      loopCb(() => (socket?.isOpen() ? socket.requestServerList() : false), 10);
  }, [socket]);

  if (getDebugState()) console.log(serverList);

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '16px',
        padding: '16px',
      }}
    >
      {serverList.map((server) => {
        return (
          <Button
            key={server.id}
            sx={{
              backgroundColor: colors.serverCardBg,
              color: 'black',
              width: '300px',
              maxWidth: '300px',
              height: '400px',
              maxHeight: '400px',
              zIndex: 0,
              padding: 0,
              cursor: 'default',
              textTransform: 'none',
              display: 'flex',
              flexDirection: 'column',
              '&:hover': {
                backgroundColor: 'white',
              },
              '& span': {
                color: colors.serverCardRipple,
              },
            }}
          >
            <Box
              sx={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                flexGrow: '1',
                '&:hover': {
                  backgroundColor: colors.fade[100],
                },
              }}
            >
              <Box
                sx={{
                  overflow: 'hidden',
                }}
              >
                <img
                  src=""
                  alt="Server Icon"
                  style={{
                    aspectRatio: '1/1',
                    height: '100%',
                  }}
                />
              </Box>
              <Box
                sx={{
                  flexGrow: 1,
                }}
              >
                <Typography>{server.name}</Typography>
              </Box>
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                gap: '8px',
                padding: '24px',
              }}
            >
              <Button
                variant="contained"
                color={server.isMutual ? 'secondary' : 'success'}
                sx={{
                  zIndex: 1,
                  '& span': {
                    color: colors.buttonRipple + ' !important',
                  },
                }}
              >
                {server.isMutual ? 'Manage' : 'Add'}
              </Button>
            </Box>
          </Button>
        );
      })}
    </Box>
  );
}

defineComponentLayout(Servers, AppLayout);

export default Servers;
