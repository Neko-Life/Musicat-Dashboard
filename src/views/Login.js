import { useSearchParams } from 'react-router-dom';

export default function Login() {
  const [searchParams, setSearchParams] = useSearchParams();

  // send searchParams to server

  return (
    <div>
      <p>Oauth code: {searchParams.get('code')}</p>
      <p>Oauth state: {searchParams.get('state')}</p>
    </div>
  );
}
