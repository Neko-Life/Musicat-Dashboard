import Command from '../../classes/Command';
import { toggleConsole } from '../../store/actionCreators';
import store from '../../store/store';

export default class ConsoleExitCommand extends Command {
  constructor() {
    super('exit');
  }

  run(args) {
    store.dispatch(toggleConsole());
  }
}
