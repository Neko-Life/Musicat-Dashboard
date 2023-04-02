import {
  CONSOLE_CONSOLE_CLEAR,
  CONSOLE_CONSOLE_PRINT,
  SET_BOT_INFO,
  SET_DEBUG,
  TOGGLE_CONSOLE,
} from './actionTypes';

export const setBotInfo = (payload) => {
  return {
    type: SET_BOT_INFO,
    payload,
  };
};

export const setDebug = (payload) => {
  return {
    type: SET_DEBUG,
    payload,
  };
};

export const consoleConsolePrint = (payload) => {
  return {
    type: CONSOLE_CONSOLE_PRINT,
    payload,
  };
};

export const consoleConsoleClear = () => {
  return {
    type: CONSOLE_CONSOLE_CLEAR,
  };
};

export const toggleConsole = () => {
  return {
    type: TOGGLE_CONSOLE,
  };
};
