import React, { useEffect } from 'react';
import Landing from './views/Landing';
import './managers/Managers';
import commonStyles from './assets/common.module.css';
import './App.css';
import { actions } from './store/reducers';
import { useDispatch } from 'react-redux';
import { connectSocket } from './socket/socket';

function App() {
  const dispatch = useDispatch();

  // init socket
  useEffect(() => {
    const socket = connectSocket();

    dispatch(actions.main.setSocket(socket));
  }, []);

  return (
    <div className={`${commonStyles.App} App theme-dark`}>
      <Landing />
    </div>
  );
}

export default App;
