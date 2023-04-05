import ConsoleClearCommand from './commands/clear';
import ConsoleExitCommand from './commands/exit';
import DebugCommand from './commands/debug';
import PingCommand from './commands/ping';
import ConsoleMaxHCommand from './commands/console-max-h';
import EchoCommand from './commands/echo';

export const registerAll = (commandManager) => {
  commandManager.register(new ConsoleClearCommand());
  commandManager.register(new DebugCommand());
  commandManager.register(new ConsoleExitCommand());
  commandManager.register(new PingCommand());
  commandManager.register(new ConsoleMaxHCommand());
  commandManager.register(new EchoCommand());
};
