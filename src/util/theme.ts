import { CONSOLE_MARGIN_TOP } from '@/configs/constants';

export const getConsoleMarginTop = () => {
  return `${CONSOLE_MARGIN_TOP}px`;
};

export const getColors = () => {
  return Object.freeze({
    error: 'red',
    warn: 'yellow',
    success: 'green',
    info: 'cyan',
    serverCardBg: 'white',
    serverCardRipple: 'blue',
    buttonRipple: 'white',
    fade: {
      100: 'rgba(0,0,0,0.1)',
      200: 'rgba(0,0,0,0.2)',
      300: 'rgba(0,0,0,0.3)',
      400: 'rgba(0,0,0,0.4)',
      500: 'rgba(0,0,0,0.5)',
    },
  });
};
