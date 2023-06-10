import { useContext, useEffect } from 'react';
import { getDebugState } from '@/util/dbg';
import AppLayout from '@/layouts/AppLayout';
import { defineComponentLayout } from '@/util/defineLayout';
import { useMainSelector } from '@/hooks/useSelector';
import MainContext from '@/contexts/MainContext';
import { loopCb } from '@/util/util';

function Servers() {
  const { socket } = useContext(MainContext);
  const { serverList } = useMainSelector();

  useEffect(() => {
    if (socket) loopCb(() => socket && socket.requestServerList(), 10);
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
