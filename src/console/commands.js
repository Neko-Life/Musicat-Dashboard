import ConsoleClearCommand from './commands/clear';
import ConsoleExitCommand from './commands/exit';
import DebugCommand from './commands/debug';

export const registerAll = (commandManager) => {
  commandManager.register(new ConsoleClearCommand());
  commandManager.register(new DebugCommand());
  commandManager.register(new ConsoleExitCommand());
};
