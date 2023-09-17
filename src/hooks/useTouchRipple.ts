import { getColors } from '@/util/theme';
import { useRef } from 'react';
import type { MouseEventHandler } from 'react';

const colors = getColors();

export default function useTouchRipple() {
  const rippleRef = useRef<any>();

  const handleMouseDown: MouseEventHandler<unknown> = (e) => {
    rippleRef.current?.start(e);
    setTimeout(() => handleMouseUp(e), 1000);
  };

  const handleMouseUp: MouseEventHandler<unknown> = (e) => {
    rippleRef.current?.stop(e);
  };

  return {
    rippleRef,
    rippleParentProps: Object.freeze({
      onMouseDown: handleMouseDown,
      onMouseUp: handleMouseUp,
    }),
    rippleParentStyles: Object.freeze({
      position: 'relative',
    }),
    rippleStyles: Object.freeze({ color: colors.serverCardRipple }),
  };
}
