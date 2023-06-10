export default class Command {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  /**
   * Meant to be derived and overriden
   */
  run(arg: string) {}

  /**
   * Meant to be derived and overriden
   */
  parseArgs(arg: string) {}
}
