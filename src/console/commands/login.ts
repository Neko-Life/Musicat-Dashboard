import Command from '@/classes/Command';
import { getSocket } from '@/socket/instance';

export default class ConsoleLoginCommand extends Command {
  constructor() {
    super('login');
  }

  run() {
    const socket = getSocket();

    socket.requestOauthState();
  }
}
