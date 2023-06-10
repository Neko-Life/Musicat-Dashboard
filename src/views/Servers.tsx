import { useEffect } from 'react';
import { getDebugState } from '@/util/dbg';
import AppLayout from '@/layouts/AppLayout';
import { defineComponentLayout } from '@/util/defineLayout';
import { useMainSelector } from '@/hooks/useSelector';

function Servers() {
  const { serverList, socket } = useMainSelector();

  useEffect(() => {
    if (socket) socket.requestServerList();
  }, [socket]);

  if (getDebugState()) console.log(serverList);

  return (
    <div>
      {serverList.map((server) => {
        return <div key={server.id}>{server.name}</div>;
      })}
    </div>
  );
}

defineComponentLayout(Servers, AppLayout);

export default Servers;
