import { useNavigate } from 'react-router-dom';
import { setNavigator } from '../util/navigators';
import { useSelector } from 'react-redux';

export default function Servers() {
  setNavigator('landing', useNavigate());

  const { serverList } = useSelector((state) => state);
  return (
    <div>
      <ul>
        {serverList.forEach((server, idx) => {
          return <li key={server.id}>{server.name}</li>;
        })}
      </ul>
    </div>
  );
}
