import Command from '@/classes/Command';
import store from '@/store/store';
import { consolePrint } from '../console';

export default class PingCommand extends Command {
  constructor() {
    super('ping');
  }

  run() {
    const { socket } = store.getState().main;
    if (!socket) return consolePrint('[ERROR] No connection');
    socket.sendPing(true);
  }
}
