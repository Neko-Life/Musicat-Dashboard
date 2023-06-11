import { useState, useRef, useEffect } from 'react';
import type {
  FormEventHandler,
  ChangeEventHandler,
  KeyboardEventHandler,
} from 'react';
import consoleStyles from '@/assets/Console.module.css';
import commonStyles from '@/assets/common.module.css';
import { useMainSelector } from '@/hooks/useSelector';
import { Box, Button } from '@mui/material';
import { actions } from '@/store/reducers';
import { useDispatch } from 'react-redux';
import { pathIs } from '@/util/util';
import { getConsoleMarginTop } from '@/util/theme';
import { getCommandManager } from '@/managers/instance';

interface IConsoleProps {
  disabled?: boolean;
}

const { toggleConsole } = actions.main;

export default function Console({ disabled }: IConsoleProps) {
  const commandManager = getCommandManager();
  const { stdout, showConsole } = useMainSelector();
  const dispatch = useDispatch();
  const [savedCommand, setSavedCommand] = useState('');
  const [command, setCommand] = useState('');

  const lastStdout = useRef<HTMLDivElement>(null);
  const stdinInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (lastStdout.current)
      lastStdout.current.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
        inline: 'end',
      });
  }, [stdout]);

  const handleConsoleCommand = (command: string) =>
    commandManager?.handle(command);

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (!command) return;

    handleConsoleCommand(command);

    setCommand('');
    setSavedCommand('');
  };

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setCommand(e.target.value);
    setSavedCommand(e.target.value);
  };

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (!commandManager) return;

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setCommand(commandManager.getPreviousCommand() || savedCommand);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setCommand(commandManager.getNextCommand() || savedCommand);
    }
  };

  const handleToggleConsoleClick = () => {
    dispatch(toggleConsole());
  };

  return (
    <div className={`${commonStyles.shadowLight} ${consoleStyles.console}`}>
      <div className={consoleStyles.consoleStdContainer}>
        <Box
          id="console-stdout"
          className={consoleStyles.consoleStdout}
          sx={{
            height: pathIs('/console')
              ? `calc(100vh - ${getConsoleMarginTop()})`
              : 'unset',
          }}
        >
          {stdout?.map((str, idx) => (
            <div ref={idx === stdout.length - 1 ? lastStdout : null} key={idx}>
              <p className={commonStyles.noMar}>{str}</p>
            </div>
          ))}
        </Box>

        <div className={consoleStyles.consoleStdin}>
          <form
            className={consoleStyles.consoleStdinForm}
            onSubmit={handleSubmit}
          >
            <input
              ref={stdinInput}
              id="console-stdin-form-input"
              className={consoleStyles.stdinFormInput}
              value={command}
              onChange={handleInputChange}
              type="text"
              disabled={disabled}
              autoComplete="off"
              onKeyDown={handleKeyDown}
            />
          </form>
        </div>
      </div>

      <Box>
        <Button
          className={showConsole ? 'active' : ''}
          disableTouchRipple
          sx={{
            transition: '.5s',
            position: 'fixed',
            bottom: '18px',
            right: '-96px',
            fontWeight: 600,
            minWidth: 0,
            padding: '10px 24px 8px 24px',
            lineHeight: 'unset',
            color: showConsole ? 'white' : '',
            '&:hover, &.active': {
              right: '0px',
            },
          }}
          onClick={handleToggleConsoleClick}
        >
          Console
        </Button>
      </Box>
    </div>
  );
}
