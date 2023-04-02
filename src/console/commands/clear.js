import Command from '../../classes/Command';
import { consoleConsoleClear } from '../../store/actionCreators';
import store from '../../store/store';

export default class ConsoleClearCommand extends Command {
  constructor() {
    super('clear');
  }

  run(args) {
    store.dispatch(consoleConsoleClear());
  }
}
