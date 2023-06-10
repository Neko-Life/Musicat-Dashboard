import CommandManager from '@/managers/CommandManager';
import { registerAll } from '@/console/commands';
import store from '@/store/store';
import { setCommandManager } from '@/store/actionCreators';

const commandManager = new CommandManager();
registerAll(commandManager);

store.dispatch(setCommandManager(commandManager));
