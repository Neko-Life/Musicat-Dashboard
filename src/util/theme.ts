import { CONSOLE_MARGIN_TOP } from '@/configs/constants';
import { main } from '@/configs/themes';

export const getConsoleMarginTop = () => {
  return `${CONSOLE_MARGIN_TOP}px`;
};

export const getColors = () => {
  return main.color;
};
