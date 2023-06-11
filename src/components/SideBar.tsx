import React from 'react';
import { getRandMessage, pathIs } from '@/util/util';
import sidebarStyles from '@/assets/SideBar.module.css';
import commonStyles from '@/assets/common.module.css';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { sxButtonCommonStyles as sxButtonCommonStylesFn } from '@/styles/Button';

const getBtnStyles = (active?: boolean) => {
  return sxButtonCommonStylesFn(active);
};

export default function SideBar() {
  const navigate = useNavigate();
  const [currentMessage, setCurrentMessage] = React.useState('');
  const [hovering, setHovering] = React.useState(false);

  const msgRef = React.useRef<HTMLDivElement>(null);

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
          <Button
            sx={getBtnStyles(pathIs('/'))}
            onClick={() => {
              navigate('/');
            }}
          >
            Home
          </Button>
          <Button
            sx={getBtnStyles(pathIs('/servers'))}
            onClick={() => {
              navigate('/servers');
            }}
          >
            Servers
          </Button>
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
