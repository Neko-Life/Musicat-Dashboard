import Command from '@/classes/Command';
import { getConsoleStdout } from '@/managers/instance';

export default class ConsoleClearCommand extends Command {
  constructor() {
    super('clear');
  }

  run() {
    getConsoleStdout().clear();
  }
}
