import { CONSOLE_MARGIN_TOP } from '@/configs/constants';

export const getConsoleMarginTop = () => {
  return `${CONSOLE_MARGIN_TOP}px`;
};

export const getColors = () => {
  return {
    error: 'red',
    warn: 'yellow',
    success: 'green',
    info: 'cyan',
    serverCardBg: 'white',
  };
};
