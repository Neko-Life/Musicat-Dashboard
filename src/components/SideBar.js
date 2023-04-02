import { useDispatch, useSelector } from 'react-redux';
import { toggleConsole } from '../store/actionCreators';

export default function SideBar() {
  const dispatch = useDispatch();
  const { showConsole } = useSelector((state) => state);

  const handleToggleConsoleChange = () => {
    dispatch(toggleConsole());
  };

  return (
    <div>
      <input
        id="toggle-console"
        type="checkbox"
        checked={showConsole}
        onChange={handleToggleConsoleChange}
      />
      <label htmlFor="toggle-console">Console</label>
    </div>
  );
}
