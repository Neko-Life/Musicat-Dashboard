import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setNavigator } from '@/util/navigators';
import Footer from '@/components/Footer';
import NavBar from '@/components/NavBar';
import SideBar from '@/components/SideBar';
import Console from '@/components/Console';
import appLayoutStyles from '@/assets/AppLayout.module.css';
import consoleStyles from '@/assets/Console.module.css';
import commonStyles from '@/assets/common.module.css';

function AppLayout({ children }) {
  setNavigator('landing', useNavigate());
  const { showConsole } = useSelector((state) => state);

  useEffect(() => {
    if (showConsole) {
      document
        .querySelector('#console-stdin-form-input')
        ?.focus({ preventScroll: true });
    }
  }, [showConsole]);

  return (
    <>
      <NavBar />
      <div
        className={`${appLayoutStyles.mainContainer} ${commonStyles.shadowLight}`}
      >
        <div className={appLayoutStyles.sidebarOuterContainer}>
          <SideBar />
        </div>
        <div className={appLayoutStyles.mainMainContainer}>
          <div className={appLayoutStyles.mainMainContainerTop}>{children}</div>
          <div className={appLayoutStyles.mainMainContainerBottom}>
            <div
              className={`${consoleStyles.consoleContainer} ${
                showConsole ? consoleStyles.consoleShow : ''
              }`}
            >
              <Console disabled={!showConsole} />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default AppLayout;
