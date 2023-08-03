import { IConsoleStdoutEntry } from '@/interfaces/console';
import { getConsoleStdout } from '@/managers/instance';

export const consolePrint = (item: IConsoleStdoutEntry) => {
  getConsoleStdout().print(item);
};
