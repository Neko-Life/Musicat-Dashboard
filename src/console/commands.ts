import ConsoleClearCommand from './commands/clear';
import ConsoleExitCommand from './commands/exit';
import DebugCommand from './commands/debug';
import PingCommand from './commands/ping';
import ConsoleMaxHCommand from './commands/console-max-h';
import EchoCommand from './commands/echo';
import type CommandManager from '@/managers/CommandManager';

export const registerAll = (commandManager: CommandManager) => {
  commandManager.register(new ConsoleClearCommand());
  commandManager.register(new DebugCommand());
  commandManager.register(new ConsoleExitCommand());
  commandManager.register(new PingCommand());
  commandManager.register(new ConsoleMaxHCommand());
  commandManager.register(new EchoCommand());
};
