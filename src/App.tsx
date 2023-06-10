import React, { useEffect } from 'react';
import Landing from '@/views/Landing';
import commonStyles from '@/assets/common.module.css';
import '@/App.css';
import { connectSocket } from '@/socket/socket';
import MainContext from '@/contexts/MainContext';
import useMainContextValues from '@/hooks/useMainContextValues';
import CommandManager from '@/managers/CommandManager';
import { registerAll } from '@/console/commands';

function App() {
  const mainContextValues = useMainContextValues();

  // init socket and command manager
  useEffect(() => {
    const socket = connectSocket();

    const commandManager = new CommandManager();
    registerAll(commandManager);

    const { setSocket, setCommandManager } = mainContextValues;

    setSocket(socket);
    setCommandManager(commandManager);

    // clean ups
    return () => {
      socket.shutdown();
      setSocket(undefined);
      setCommandManager(undefined);
    };
  }, []);

  return (
    <MainContext.Provider value={mainContextValues}>
      <div className={`${commonStyles.App} App theme-dark`}>
        <Landing />
      </div>
    </MainContext.Provider>
  );
}

export default App;
