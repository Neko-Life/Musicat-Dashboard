import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Footer from '../components/Footer';
import NavBar from '../components/NavBar';
import SideBar from '../components/SideBar';
import router from '../router/router-Landing';
import Console from '../components/Console';
import '../assets/Landing.css';
import '../assets/common.css';

export default function Landing() {
  const { showConsole } = useSelector((state) => state);
  React.useEffect(() => {
    if (showConsole) {
      document
        .querySelector('#console-stdin-form-input')
        ?.focus({ preventScroll: true });
    }
  }, [showConsole]);

  return (
    <>
      <NavBar />
      <div className="shadow-light main-container">
        <div className="sidebar-outer-container">
          <SideBar />
        </div>
        <div className="main-main-container">
          <div className="main-main-container-top">
            <RouterProvider router={router} />
          </div>
          <div className="main-main-container-bottom">
            <div
              className={`console-container ${
                showConsole ? 'console-show' : ''
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
