import { useEffect } from 'react';
import { getDebugState } from '@/util/dbg';
import AppLayout from '@/layouts/AppLayout';
import { defineComponentLayout } from '@/util/defineLayout';
import { useMainSelector } from '@/hooks/useSelector';
import { loopCb } from '@/util/util';
import { getSocket } from '@/socket/instance';
import { Box } from '@mui/material';
import ServerCard from '@/components/Servers/ServerCard';

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
        justifyContent: 'center',
        gap: '16px',
        padding: '16px',
      }}
    >
      {serverList.map((server, idx) => {
        return <ServerCard key={idx} server={server} />;
      })}
    </Box>
  );
}

defineComponentLayout(Servers, AppLayout);

export default Servers;
