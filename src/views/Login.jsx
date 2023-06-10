import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import AppLayout from '@/layouts/AppLayout';
import { defineComponentLayout } from '@/util/defineLayout';
import { useMainSelector } from '@/hooks/useSelector';

function Login() {
  const { socket } = useMainSelector();
  const [data] = useSearchParams();

  const execSend = async () => {
    while (true)
      if (
        await new Promise((r, j) =>
          setTimeout(() => r(socket && socket?.sendOauth(data)), 1000)
        )
      )
        break;
  };

  useEffect(() => {
    execSend();
  }, []);

  return (
    <div>
      <h1>Please wait, loading...</h1>
    </div>
  );
}

defineComponentLayout(Login, AppLayout);

export default Login;
