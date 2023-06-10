import React from 'react';
import { useDispatch } from 'react-redux';
import { getRandMessage } from '@/util/util';
import sidebarStyles from '@/assets/SideBar.module.css';
import commonStyles from '@/assets/common.module.css';
import { useNavigate } from 'react-router-dom';
import { actions } from '@/store/reducers';
import { useMainSelector } from '@/hooks/useSelector';

const { toggleConsole } = actions.main;

export default function SideBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentMessage, setCurrentMessage] = React.useState('');
  const [hovering, setHovering] = React.useState(false);

  const msgRef = React.useRef<HTMLDivElement>(null);

  const { showConsole } = useMainSelector();

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
              navigate('/');
            }}
          >
            Home
          </button>
          <button
            onClick={() => {
              navigate('/servers');
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
