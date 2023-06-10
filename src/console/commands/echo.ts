import Command from '@/classes/Command';
import { consolePrint } from '../console';

export default class EchoCommand extends Command {
  constructor() {
    super('echo');
  }

  run(args: string) {
    return consolePrint(args);
  }
}
