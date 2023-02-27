import { applyMiddleware, legacy_createStore } from "redux";
import thunk from "redux-thunk";
// import actions

/**
 * @typedef {object} ActionReducer
 * @property {string} type
 * @property {any} payload
 */

const initialState = {
  socket: null,
};

/**
 * @param {typeof initialState} state
 * @param {ActionReducer} action
 */
const reducer = (state = initialState, action) => {
  switch(action.type) {
    default:
      return state;
  }
}

export default legacy_createStore(reducer, applyMiddleware(thunk));
