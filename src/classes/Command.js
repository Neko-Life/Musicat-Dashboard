export default class Command {
  constructor(name) {
    this.name = name;
  }

  /**
   * Meant to be derived and overriden
   */
  run(args) {}

  /**
   * Meant to be derived and overriden
   */
  parseArgs(args) {}
}
