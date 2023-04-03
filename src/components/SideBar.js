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
    <>
      <div className="sidebar-container sidebar-left">
        <div className="shadow-light sidebar-left-container">
          <div>
            <input
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
        <div className="sidebar-expand-trigger-left"></div>
      </div>
      <div className="sidebar-container sidebar-right">
        <div className="sidebar-expand-trigger-right"></div>
        <div className="shadow-light sidebar-right-container">
          <div>
            <input
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
      </div>
    </>
  );
}
