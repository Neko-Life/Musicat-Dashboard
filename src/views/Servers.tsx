import { useEffect } from 'react';
import { getDebugState } from '@/util/dbg';
import AppLayout from '@/layouts/AppLayout';
import { defineComponentLayout } from '@/util/defineLayout';
import { useMainSelector } from '@/hooks/useSelector';
import { loopCb } from '@/util/util';
import { getSocket } from '@/socket/instance';
import { Box, Button } from '@mui/material';
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
        gap: '16px',
      }}
    >
      {serverList.map((server) => {
        return (
          <Button
            variant="contained"
            key={server.id}
            sx={{
              backgroundColor: colors.serverCardBg,
              color: 'black',
              minWidth: '300px',
              minHeight: '500px',
              zIndex: 0,
            }}
          >
            {server.name}
          </Button>
        );
      })}
    </Box>
  );
}

defineComponentLayout(Servers, AppLayout);

export default Servers;
