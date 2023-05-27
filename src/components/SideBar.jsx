import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleConsole } from '../store/actionCreators';
import { getNavigator } from '../util/navigators';
import { getRandMessage } from '../util/util';
import sidebarStyles from '../assets/SideBar.module.css';
import commonStyles from '../assets/common.module.css';

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
      <div
        className={`${sidebarStyles.sidebarContainer} ${sidebarStyles.sidebarLeft}`}
      >
        <div
          className={`${commonStyles.shadowLight} ${sidebarStyles.sidebarLeftContainer}`}
        >
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
              getNavigator('landing')?.('/');
            }}
          >
            Home
          </button>
          <button
            onClick={() => {
              getNavigator('landing')?.('/servers');
            }}
          >
            Servers
          </button>
        </div>
        <div className={sidebarStyles.sidebarExpandTriggerLeft}></div>
      </div>
      <div
        ref={msgRef}
        onTransitionEnd={() => setHovering(!hovering)}
        className={`${sidebarStyles.sidebarRight} ${sidebarStyles.sidebarContainer}`}
      >
        <div className={sidebarStyles.sidebarExpandTriggerRight}></div>
        <div
          className={`${commonStyles.shadowLight} ${sidebarStyles.sidebarRightContainer} ${sidebarStyles.tinyText}`}
        >
          <div>{currentMessage}</div>
        </div>
      </div>
    </>
  );
}
