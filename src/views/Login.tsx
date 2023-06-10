import { useContext, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import AppLayout from '@/layouts/AppLayout';
import { defineComponentLayout } from '@/util/defineLayout';
import MainContext from '@/contexts/MainContext';
import { loopCb } from '@/util/util';

function Login() {
  const { socket } = useContext(MainContext);
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
