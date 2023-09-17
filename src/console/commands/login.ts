import Command from '@/classes/Command';
import { getSocket } from '@/socket/instance';
import { getRedirectUri } from '@/util/util';

export default class ConsoleLoginCommand extends Command {
  constructor() {
    super('login');
  }

  run() {
    const socket = getSocket();

    socket.requestOauth(getRedirectUri('/login'));
  }
}
