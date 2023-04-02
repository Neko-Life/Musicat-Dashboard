import { consoleConsolePrint } from '../store/actionCreators';
import store from '../store/store';

export const consolePrint = (str) => {
  store.dispatch(consoleConsolePrint(str));
};
