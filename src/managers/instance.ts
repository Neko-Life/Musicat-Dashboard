import { registerAll } from '@/console/commands';
import CommandManager from './CommandManager';
import ConsoleStdout from '@/classes/ConsoleStdout';

const commandManager = new CommandManager();
registerAll(commandManager);

const consoleStdout = new ConsoleStdout();

export const getCommandManager = () => commandManager;
export const getConsoleStdout = () => consoleStdout;
