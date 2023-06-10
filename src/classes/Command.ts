export default class Command {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  /**
   * Meant to be derived and overriden
   */
  run() {}

  /**
   * Meant to be derived and overriden
   */
  parseArgs() {}
}
