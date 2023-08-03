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
import { useSearchParams } from 'react-router-dom';
import { actions } from '@/store/reducers';
import { useDispatch } from 'react-redux';
import { pathIs } from '@/util/util';

interface IAppLayoutProps extends ILayoutProps {
  hideNavBar?: boolean;
}

const { toggleConsole } = actions.main;

function AppLayout({ children, hideNavBar }: IAppLayoutProps) {
  const dispatch = useDispatch();
  const { showConsole } = useMainSelector();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (showConsole) {
      const el: HTMLInputElement | null = document.querySelector(
        '#console-stdin-form-input'
      );

      el?.focus({ preventScroll: true });
    }
  }, [showConsole]);

  useEffect(() => {
    const shouldShowConsole =
      pathIs('/console') || searchParams.get('console') === '1';

    if (!showConsole && shouldShowConsole) dispatch(toggleConsole());
  }, []);

  return (
    <>
      {hideNavBar ? null : <NavBar />}
      <div
        className={`${appLayoutStyles.mainContainer} ${commonStyles.shadowLight}`}
      >
        <div className={appLayoutStyles.sidebarOuterContainer}>
          <SideBar />
        </div>
        <div className={appLayoutStyles.mainMainContainer}>
          <div className={appLayoutStyles.mainMainContainerTop}>{children}</div>
          <div className={appLayoutStyles.mainMainContainerBottom}></div>
        </div>
      </div>
      <Footer />
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          zIndex: 10,
          display: 'contents',
        }}
      >
        <div
          style={{
            position: 'relative',
            display: 'contents',
          }}
        >
          <div className={`${consoleStyles.consoleContainer}`}>
            <Console disabled={!showConsole} />
          </div>
        </div>
      </div>
    </>
  );
}

export default AppLayout;
