import Command from '../../classes/Command';
import store from '../../store/store';

export default class PingCommand extends Command {
  constructor() {
    super('ping');
  }

  run(args) {
    const { socket } = store.getState();
    socket.sendPing(true);
  }
}
