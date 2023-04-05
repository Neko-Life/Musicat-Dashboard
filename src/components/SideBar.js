import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleConsole } from '../store/actionCreators';
import navigators from '../util/navigators';
import { getRandMessage } from '../util/util';
import '../assets/SideBar.css';

export default function SideBar() {
  const dispatch = useDispatch();
  const [currentMessage, setCurrentMessage] = React.useState('');
  const [hovering, setHovering] = React.useState(false);

  /**
   * @type {React.LegacyRef<HTMLDivElement>}
   */
  const msgRef = React.useRef(null);

  const { showConsole } = useSelector((state) => state);

  const handleToggleConsoleChange = () => {
    dispatch(toggleConsole());
  };

  React.useEffect(() => {
    if (msgRef.current && !hovering) {
      setCurrentMessage(getRandMessage());
    }
  }, [hovering]);

  return (
    <>
      <div className="sidebar-container sidebar-left">
        <div className="shadow-light sidebar-left-container">
          <div>
            <input
              id="toggle-console"
              type="checkbox"
              checked={showConsole}
              onChange={handleToggleConsoleChange}
            />
            <label htmlFor="toggle-console">Console</label>
          </div>
          <button
            onClick={() => {
              navigators.landing?.('/');
            }}
          >
            Home
          </button>
          <button
            onClick={() => {
              navigators.landing?.('/servers');
            }}
          >
            Servers
          </button>
        </div>
        <div className="sidebar-expand-trigger-left"></div>
      </div>
      <div
        ref={msgRef}
        onTransitionEnd={() => setHovering(!hovering)}
        className="sidebar-container sidebar-right"
      >
        <div className="sidebar-expand-trigger-right"></div>
        <div className="shadow-light sidebar-right-container tiny-text">
          <div>{currentMessage}</div>
        </div>
      </div>
    </>
  );
}
