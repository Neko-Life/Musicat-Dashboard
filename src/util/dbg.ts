import store, { actions } from '@/store/store';

const { setDebug } = actions.main;

export const getDebugState = () => {
  const { debug } = store.getState().main;

  return debug === true;
};

export const setDebugState = (state: boolean) => {
  if (typeof state !== 'boolean') throw new TypeError('state must be boolean');

  store.dispatch(setDebug(state));
};
