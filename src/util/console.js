import store from '../store/store';

export const handleConsoleCommand = (command) => {
  const { commandManager } = store.getState();
  return commandManager?.handle(command);
};
