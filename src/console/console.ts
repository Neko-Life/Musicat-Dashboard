import { IConsoleStdoutEntry } from '@/interfaces/console';
import store, { actions } from '@/store/store';

const { consoleConsolePrint } = actions.main;

export const consolePrint = (str: IConsoleStdoutEntry) => {
  store.dispatch(consoleConsolePrint(str));
};
