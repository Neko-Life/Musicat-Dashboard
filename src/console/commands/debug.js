import Command from '../../classes/Command';
import { getDebugState, setDebugState } from '../../util/dbg';
import { consolePrint } from '../console';

export default class DebugCommand extends Command {
  constructor() {
    super('debug');
  }

  run(args) {
    setDebugState(!getDebugState());
    consolePrint('debug: ' + (getDebugState() ? 'enabled' : 'disabled'));
  }
}
