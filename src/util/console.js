import { registerAll } from '../console/commands';
import { consolePrint } from '../console/console';
import CommandManager from '../managers/CommandManager';
import { getDebugState } from './dbg';

const commandManager = new CommandManager();
registerAll(commandManager);

export const handleConsoleCommand = (command) => {
  const debug = getDebugState();

  command = command.trim();

  if (!command) return;

  if (debug) console.log('command:', command);

  let cmd = '';

  for (const c of command) {
    if (c === ' ') break;

    cmd += c;
  }

  const args = command.slice(cmd.length).trim();

  const handler = commandManager.get(cmd);

  if (!handler) {
    consolePrint('[ERROR]: No such command');
    return;
  }

  return handler.run(args);
};
