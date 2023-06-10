import Command from '@/classes/Command';
import { consolePrint } from '../console';

export default class EchoCommand extends Command {
  constructor() {
    super('echo');
  }

  run(args) {
    return consolePrint(args);
  }
}
