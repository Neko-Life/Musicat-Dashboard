import { useEffect } from 'react';
import Footer from '@/components/Footer';
import NavBar from '@/components/NavBar';
import SideBar from '@/components/SideBar';
import Console from '@/components/Console';
import appLayoutStyles from '@/assets/AppLayout.module.css';
import consoleStyles from '@/assets/Console.module.css';
import commonStyles from '@/assets/common.module.css';
import { useMainSelector } from '@/hooks/useSelector';
import { ILayoutProps } from '@/interfaces/layouts';

function AppLayout({ children }: ILayoutProps) {
  const { showConsole } = useMainSelector();

  useEffect(() => {
    if (showConsole) {
      const el: HTMLInputElement | null = document.querySelector(
        '#console-stdin-form-input'
      );

      el?.focus({ preventScroll: true });
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
