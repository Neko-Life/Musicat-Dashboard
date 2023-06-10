import { useState } from 'react';
import type CommandManager from '@/managers/CommandManager';
import type { MCSocket } from '@/socket/socket';

export default function useMainContextValues() {
  const [socket, setSocket] = useState<MCSocket | undefined>();
  const [commandManager, setCommandManager] = useState<
    CommandManager | undefined
  >();

  return { socket, setSocket, commandManager, setCommandManager };
}
