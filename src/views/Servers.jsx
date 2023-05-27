import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getDebugState } from '../util/dbg';
import AppLayout from '../layouts/AppLayout';

export default function Servers() {
  const { serverList, socket } = useSelector((state) => state);

  useEffect(() => {
    if (socket) socket.requestServerList();
  }, [socket]);

  if (getDebugState()) console.log(serverList);

  return (
    <AppLayout>
      <div>
        <ul>
          {serverList.map((server, idx) => {
            return <li key={server.id}>{server.name}</li>;
          })}
        </ul>
      </div>
    </AppLayout>
  );
}
