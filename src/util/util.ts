import { RANDOM_MESSAGES } from '@/configs/constants.js';

export const rand = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getRandMessage = () => {
  return RANDOM_MESSAGES[Math.floor(Math.random() * RANDOM_MESSAGES.length)];
};

/**
 * Keep calling `callback` with max number of `iteration` in `sleep` interval
 * `iteration` must be positive integer
 * `callback` must return `true` to break out of loop
 */
export const loopCb = async (
  cb: () => boolean | undefined,
  sleep: number = 1000,
  iteration: number = 60
) => {
  while (iteration) {
    if (await new Promise((r, j) => setTimeout(() => r(cb()), sleep))) break;
    iteration--;
  }
};

/**
 * Is `path` is current location path?
 */
export const pathIs = (path?: string) => {
  return window.location.pathname === path;
};

export const getRedirectUri = (path: string = '') => {
  return encodeURIComponent(window.location.origin + path);
};
