import { applyMiddleware, legacy_createStore } from "redux";
import thunk from "redux-thunk";
import { connectSocket } from "../socket/socket";
import { SET_BOT_INFO } from "./actionTypes";

/**
 * @typedef {object} ReducerAction
 * @property {string} type
 * @property {any} payload
 */

const initialState = {
  socket: connectSocket(),
  botInfo: null,
};

/**
 * @param {typeof initialState} state
 * @param {ReducerAction} action
 */
const reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch(type) {
    case SET_BOT_INFO:
      return {
        ...state,
        botInfo: payload,
      };
    default:
      return state;
  }
}

export default legacy_createStore(reducer, applyMiddleware(thunk));
