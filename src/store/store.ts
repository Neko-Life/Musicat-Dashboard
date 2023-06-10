import { configureStore } from '@reduxjs/toolkit';
import { reducer, actions } from './reducers';

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredPaths: ['main.socket', 'main.commandManager'],
        ignoredActionPaths: ['payload'],
      },
    }),
});

export type AppState = ReturnType<typeof store.getState>;

export { actions };
export default store;
