import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { setNavigator } from '../util/navigators';
import { useSelector } from 'react-redux';
import { getDebugState } from '../util/dbg';

export default function Servers() {
  setNavigator('landing', useNavigate());

  const { serverList, socket } = useSelector((state) => state);

  useEffect(() => {
    if (socket) socket.requestServerList();
  }, [socket]);

  if (getDebugState()) console.log(serverList);

  return (
    <div>
      <ul>
        {serverList.map((server, idx) => {
          return <li key={server.id}>{server.name}</li>;
        })}
      </ul>
    </div>
  );
}
