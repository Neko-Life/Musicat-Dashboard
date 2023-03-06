import { SET_BOT_INFO } from "./actionTypes";

export const setBotInfo = (payload) => {
  return {
    type: SET_BOT_INFO,
    payload,
  };
}
