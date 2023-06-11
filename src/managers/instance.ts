import { registerAll } from '@/console/commands';
import CommandManager from './CommandManager';

const commandManager = new CommandManager();
registerAll(commandManager);

export const getCommandManager = () => commandManager;
