import Command from '../classes/Command';

export default class CommandManager {
  constructor() {
    this.commands = new Map();
  }

  get(command) {
    return this.commands.get(command);
  }

  register(commandClass) {
    if (!(commandClass instanceof Command))
      throw new TypeError('Command must be instance of Command class');

    if (!commandClass.name) throw new Error('Command must have a name');

    this.commands.set(commandClass.name, commandClass);
  }
}