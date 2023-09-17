import { useEffect } from 'react';
import { useMainSelector } from '@/hooks/useSelector';
import { ILayoutProps } from '@/interfaces/layouts';

function PlayerLayout({ children }: ILayoutProps) {
  return (
    <div>
      <h1>Player Layout</h1>
      {children}
    </div>
  );
}

export default PlayerLayout;
