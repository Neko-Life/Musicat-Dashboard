import { setDebug } from '@/store/actionCreators';
import store from '@/store/store';

export const getDebugState = () => {
  const { debug } = store.getState();

  return debug === true;
};

export const setDebugState = (state) => {
  if (typeof state !== 'boolean') throw new TypeError('state must be boolean');

  store.dispatch(setDebug(state));
};
