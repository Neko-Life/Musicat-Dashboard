import { applyMiddleware, legacy_createStore } from "redux";
import thunk from "redux-thunk";
import { connectSocket } from "../socket/socket";

/**
 * @typedef {object} ReducerAction
 * @property {string} type
 * @property {any} payload
 */

const initialState = {
  socket: connectSocket(),
};

/**
 * @param {typeof initialState} state
 * @param {ReducerAction} action
 */
const reducer = (state = initialState, action) => {
  switch(action.type) {
    default:
      return state;
  }
}

export default legacy_createStore(reducer, applyMiddleware(thunk));
