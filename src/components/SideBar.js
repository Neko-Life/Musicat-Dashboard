import { useDispatch, useSelector } from 'react-redux';
import { toggleConsole } from '../store/actionCreators';
import '../assets/SideBar.css';

export default function SideBar() {
  const dispatch = useDispatch();
  const { showConsole, servers } = useSelector((state) => state);

  const handleToggleConsoleChange = () => {
    dispatch(toggleConsole());
  };

  return (
    <div className="shadow-light sidebar-container">
      <div>
        <input
          id="toggle-console"
          type="checkbox"
          checked={showConsole}
          onChange={handleToggleConsoleChange}
        />
        <label htmlFor="toggle-console">Console</label>
      </div>
      <div>
        <ul>
          {servers.forEach((server, idx) => {
            return <li key={server.id}>{server.name}</li>;
          })}
        </ul>
      </div>
    </div>
  );
}
