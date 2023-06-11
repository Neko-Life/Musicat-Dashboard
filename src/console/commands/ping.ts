import Command from '@/classes/Command';
import { consolePrint } from '../console';
import { getSocket } from '@/socket/instance';

export default class PingCommand extends Command {
  constructor() {
    super('ping');
  }

  run() {
    const socket = getSocket();
    if (!socket) return consolePrint('[ERROR] No connection');
    socket.sendPing(true);
  }
}
