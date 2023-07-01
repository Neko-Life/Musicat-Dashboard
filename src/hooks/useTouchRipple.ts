import { useRef } from 'react';
import type { MouseEventHandler } from 'react';

export default function useTouchRipple() {
  const rippleRef = useRef<any>();

  const handleMouseDown: MouseEventHandler<unknown> = (e) => {
    rippleRef.current?.start(e);
  };

  const handleMouseUp: MouseEventHandler<unknown> = (e) => {
    rippleRef.current?.stop(e);
  };

  return {
    rippleRef,
    rippleParentProps: {
      onMouseDown: handleMouseDown,
      onMouseUp: handleMouseUp,
    },
    rippleParentStyles: {
      position: 'relative',
    },
  };
}
