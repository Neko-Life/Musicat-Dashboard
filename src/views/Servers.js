import { useSelector } from 'react-redux';

export default function Servers() {
  const { servers } = useSelector((state) => state);
  return (
    <div>
      <ul>
        {servers.forEach((server, idx) => {
          return <li key={server.id}>{server.name}</li>;
        })}
      </ul>
    </div>
  );
}
