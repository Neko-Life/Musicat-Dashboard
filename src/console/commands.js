import ConsoleClearCommand from './commands/clear';
import ConsoleExitCommand from './commands/exit';
import DebugCommand from './commands/debug';
import PingCommand from './commands/ping';

export const registerAll = (commandManager) => {
  commandManager.register(new ConsoleClearCommand());
  commandManager.register(new DebugCommand());
  commandManager.register(new ConsoleExitCommand());
  commandManager.register(new PingCommand());
};
