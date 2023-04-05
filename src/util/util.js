import { RANDOM_MESSAGES } from './constants.js';

export const rand = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getRandMessage = () => {
  return RANDOM_MESSAGES[Math.floor(Math.random() * RANDOM_MESSAGES.length)];
};
