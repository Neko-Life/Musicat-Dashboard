import React from 'react';
import { RouterProvider } from 'react-router-dom';
import Footer from './components/Footer';
import NavBar from './components/NavBar';
import SideBar from './components/SideBar';
import router from './router/router';
import './App.css';
import './assets/common.css';
import { useSelector } from 'react-redux';
import Console from './components/Console';

function App() {
  const { showConsole } = useSelector((state) => state);

  return (
    <div className={'App theme-dark'}>
      <NavBar />
      <div className="shadow-light main-container">
        <SideBar />
        <div className="main-main-container">
          <div className="main-main-container-top">
            <RouterProvider router={router} />
          </div>
          <div className="main-main-container-bottom">
            <div
              draggable="true"
              className={`console-container ${
                showConsole ? 'console-show' : ''
              }`}
            >
              <Console />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
