import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { setNavigator } from '../util/navigators';

export default function Login() {
  setNavigator('landing', useNavigate());

  const { socket } = useSelector((state) => state);
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
