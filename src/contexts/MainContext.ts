import type CommandManager from '@/managers/CommandManager';
import type { MCSocket } from '@/socket/socket';
import { createContext } from 'react';

interface IMainContextData {
  socket?: MCSocket;
  commandManager?: CommandManager;
}

const MainContext = createContext<IMainContextData>({});

export default MainContext;
