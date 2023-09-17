import Command from '@/classes/Command';
import { consolePrint } from '@/console/console';
import { getDebugState } from '@/util/dbg';

export default class CommandManager {
  /**
   * Command collection
   */
  commands: Map<string, Command>;

  /**
   * Command history
   */
  history: string[];

  /**
   * Command history index
   */
  historyIndex: number;

  /**
   * Maximum number of entry command history can hold
   */
  maxHistoryEntry: number;

  constructor() {
    this.commands = new Map();
    this.history = [];
    this.historyIndex = 0;
    this.maxHistoryEntry = 100;
  }

  /**
   * Handle command, returns whatever the handler returns
   */
  handle(command: string) {
    const debug = getDebugState();

    command = command.trim();

    if (debug) console.log('command: `', command, '`');

    if (!command?.length) return;

    let cmd = '';

    for (const c of command) {
      if (c === ' ') break;

      cmd += c;
    }

    const args = command.slice(cmd.length).trim();

    const handler = this.get(cmd);

    if (!handler) {
      consolePrint('[ERROR]: No such command');
      return;
    }

    const handlerResult = handler.run(args);

    if (this.history[this.history.length - 1] !== command)
      this.history.push(command);

    if (this.history.length > this.maxHistoryEntry) {
      this.history.shift();
    }
    this.historyIndex = this.history.length;

    return handlerResult;
  }

  getNextCommand() {
    return this.historyIndex === this.history.length
      ? ''
      : this.history[++this.historyIndex];
  }

  getPreviousCommand() {
    return this.history.length
      ? this.history[
          this.historyIndex === 0 ? this.historyIndex : --this.historyIndex
        ]
      : '';
  }

  /**
   * Get command from name
   * @param {string} command - command name
   */
  get(command: string) {
    return this.commands.get(command);
  }

  /**
   * Register a Command instance
   */
  register(command: Command) {
    if (!(command instanceof Command))
      throw new TypeError('Command must be instance of Command class');

    if (!command.name) throw new Error('Command must have a name');

    this.commands.set(command.name, command);
  }
}
