import { applyMiddleware, legacy_createStore } from 'redux';
import thunk from 'redux-thunk';

import { connectSocket } from '../socket/socket';

import {
  ADD_SERVER,
  CONSOLE_CONSOLE_CLEAR,
  CONSOLE_CONSOLE_PRINT,
  REMOVE_SERVER,
  SET_BOT_INFO,
  SET_DEBUG,
  TOGGLE_CONSOLE,
} from './actionTypes';

/**
 * @typedef {object} ReducerAction
 * @property {string} type
 * @property {any} payload
 */

const initialState = {
  socket: connectSocket(),
  botInfo: null,
  debug: false,
  stdout: [],
  maxStdoutEntry: 50,
  showConsole: false,
  servers: new Map(),
};

/**
 * @param {typeof initialState} state
 * @param {ReducerAction} action
 */
const reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_BOT_INFO:
      return {
        ...state,
        botInfo: payload,
      };
    case SET_DEBUG:
      return {
        ...state,
        debug: payload,
      };
    case CONSOLE_CONSOLE_PRINT: {
      const newStdout = state.stdout.slice();

      if (newStdout.length >= state.maxStdoutEntry) newStdout.shift();

      newStdout.push(payload);

      return {
        ...state,
        stdout: newStdout,
      };
    }
    case CONSOLE_CONSOLE_CLEAR:
      return {
        ...state,
        stdout: [],
      };
    case TOGGLE_CONSOLE:
      return {
        ...state,
        showConsole: !state.showConsole,
      };
    case ADD_SERVER: {
      const newServers = new Map([...state.servers, [payload.id, payload]]);

      return {
        ...state,
        servers: newServers,
      };
    }
    case REMOVE_SERVER: {
      const newServers = new Map(state.servers);
      newServers.delete(payload.id);

      return {
        ...state,
        servers: newServers,
      };
    }
    default:
      return state;
  }
};

export default legacy_createStore(reducer, applyMiddleware(thunk));
