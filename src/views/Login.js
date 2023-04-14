import { useNavigate, useSearchParams } from 'react-router-dom';
import { setNavigator } from '../util/navigators';

export default function Login() {
  setNavigator('landing', useNavigate());
  const [searchParams, setSearchParams] = useSearchParams();

  // send searchParams to server

  return (
    <div>
      <p>Oauth code: {searchParams.get('code')}</p>
      <p>Oauth state: {searchParams.get('state')}</p>
    </div>
  );
}
