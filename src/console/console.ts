import store, { actions } from '@/store/store';

const { consoleConsolePrint } = actions.main;

export const consolePrint = (str: string) => {
  store.dispatch(consoleConsolePrint(str));
};
