import { IConsoleStdoutEntry } from '@/interfaces/console';
import { renderConsoleGreet } from '@/util/console';

interface IConsoleStdoutEvents {
  update: () => void;
}

type IKeyofIConsoleStdoutEvents = keyof IConsoleStdoutEvents;

export default class ConsoleStdout {
  stdout: IConsoleStdoutEntry[];
  maxStdoutEntry: number;
  handlers: Map<
    IKeyofIConsoleStdoutEvents,
    IConsoleStdoutEvents[IKeyofIConsoleStdoutEvents]
  >;

  constructor() {
    this.stdout = [renderConsoleGreet];
    this.maxStdoutEntry = 100;
    this.handlers = new Map();
  }

  print(item: IConsoleStdoutEntry) {
    if (this.stdout.length >= this.maxStdoutEntry) this.stdout.shift();
    this.stdout.push(item);
    this.callEvent('update');
  }

  clear() {
    this.stdout = [];
    this.callEvent('update');
  }

  callEvent(
    event: IKeyofIConsoleStdoutEvents,
    args: Parameters<IConsoleStdoutEvents[typeof event]> = []
  ) {
    const handler = this.handlers.get(event);
    if (typeof handler === 'function') handler(...args);
  }

  on(
    event: IKeyofIConsoleStdoutEvents,
    cb: IConsoleStdoutEvents[typeof event]
  ) {
    this.handlers.set(event, cb);
  }

  off(event: IKeyofIConsoleStdoutEvents) {
    this.handlers.delete(event);
  }
}
