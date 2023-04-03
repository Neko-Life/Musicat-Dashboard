import React from 'react';
import { RouterProvider } from 'react-router-dom';
import Footer from './components/Footer';
import NavBar from './components/NavBar';
import SideBar from './components/SideBar';
import router from './router/router';
import './App.css';
import { useSelector } from 'react-redux';
import Console from './components/Console';

function App() {
  const { showConsole } = useSelector((state) => state);

  return (
    <div className={'App theme-dark'}>
      <NavBar />
      <div className="main-container">
        <div className="left-container">
          <SideBar />
        </div>
        <div className="right-container">
          <div className="right-container-top">
            <RouterProvider router={router} />
          </div>
          <div className="right-container-bottom">
            {showConsole && <Console />}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
