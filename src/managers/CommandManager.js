import Command from '../classes/Command';
import { consolePrint } from '../console/console';
import { getDebugState } from '../util/dbg';

export default class CommandManager {
  constructor() {
    /**
     * @type {Map<string, Command>}
     */
    this.commands = new Map();

    /**
     * Command history
     *
     * @type {string[]}
     */
    this.history = [];

    /**
     * Command history index
     *
     * @type {number}
     */
    this.historyIndex = 0;

    /**
     * Maximum number of entry command history can hold
     * @type {number}
     */
    this.maxHistoryEntry = 100;
  }

  /**
   * Handle command, returns whatever the handler returns
   * @param {string} command
   */
  handle(command) {
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

    const handler = this.get(cmd);

    if (!handler) {
      consolePrint('[ERROR]: No such command');
      return;
    }

    const handlerResult = handler.run(args);

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
  get(command) {
    return this.commands.get(command);
  }

  /**
   * Register a Command instance
   * @param {Command} commandClass
   */
  register(commandClass) {
    if (!(commandClass instanceof Command))
      throw new TypeError('Command must be instance of Command class');

    if (!commandClass.name) throw new Error('Command must have a name');

    this.commands.set(commandClass.name, commandClass);
  }
}
