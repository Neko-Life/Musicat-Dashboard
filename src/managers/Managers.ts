import CommandManager from '@/managers/CommandManager';
import { registerAll } from '@/console/commands';
import store, { actions } from '@/store/store';

const { setCommandManager } = actions.main;

const commandManager = new CommandManager();
registerAll(commandManager);

store.dispatch(setCommandManager(commandManager));
