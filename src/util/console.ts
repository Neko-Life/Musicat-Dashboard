import store from '@/store/store';

export const handleConsoleCommand = (command: string) => {
  const { commandManager } = store.getState().main;
  return commandManager?.handle(command);
};
