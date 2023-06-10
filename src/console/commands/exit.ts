import Command from '@/classes/Command';
import store, { actions } from '@/store/store';

const { toggleConsole } = actions.main;

export default class ConsoleExitCommand extends Command {
  constructor() {
    super('exit');
  }

  run() {
    store.dispatch(toggleConsole());
  }
}
