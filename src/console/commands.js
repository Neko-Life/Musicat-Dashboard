import ClearCommand from './commands/clear';
import DebugCommand from './commands/debug';

export const registerAll = (commandManager) => {
  commandManager.register(new ClearCommand());
  commandManager.register(new DebugCommand());
};
