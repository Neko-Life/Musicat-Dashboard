import Command from '@/classes/Command';
import store from '@/store/store';
import { consolePrint } from '../console';

export default class PingCommand extends Command {
  constructor() {
    super('ping');
  }

  run(args) {
    const { socket } = store.getState();
    if (!socket) return consolePrint('[ERROR] No connection');
    socket.sendPing(true);
  }
}
