import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import AppLayout from '@/layouts/AppLayout';
import { defineComponentLayout } from '@/util/defineLayout';
import { loopCb } from '@/util/util';
import { getSocket } from '@/socket/instance';

function Login() {
  const socket = getSocket();
  const [data] = useSearchParams();

  useEffect(() => {
    if (socket) loopCb(() => socket && socket.sendOauth(data));
  }, [socket]);

  return (
    <div>
      <h1>Please wait, loading...</h1>
    </div>
  );
}

defineComponentLayout(Login, AppLayout);

export default Login;
