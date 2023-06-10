import Command from '@/classes/Command';
import store, { actions } from '@/store/store';

const { consoleConsoleClear } = actions.main;

export default class ConsoleClearCommand extends Command {
  constructor() {
    super('clear');
  }

  run() {
    store.dispatch(consoleConsoleClear());
  }
}
