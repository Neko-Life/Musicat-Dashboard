import { useState, useRef, useEffect } from 'react';
import type {
  FormEventHandler,
  ChangeEventHandler,
  KeyboardEventHandler,
  RefObject,
  CSSProperties,
} from 'react';
import consoleStyles from '@/assets/Console.module.css';
import commonStyles from '@/assets/common.module.css';
import { useMainSelector } from '@/hooks/useSelector';
import { Box, Button } from '@mui/material';
import { actions } from '@/store/reducers';
import { useDispatch } from 'react-redux';
import { pathIs } from '@/util/util';
import { getColors, getConsoleMarginTop } from '@/util/theme';
import { getCommandManager, getConsoleStdout } from '@/managers/instance';
import classNames from 'classnames';
import { IConsoleStdoutEntry } from '@/interfaces/console';

const { toggleConsole } = actions.main;
const colors = getColors();

interface IConsoleProps {
  disabled?: boolean;
}

const renderLine = (
  ref: RefObject<HTMLDivElement> | null,
  item: IConsoleStdoutEntry,
  key: number
) => {
  const itemStyles: classNames.ArgumentArray = [commonStyles.noMar];

  const isItemString = typeof item === 'string';

  const startsWith = (str: string) => {
    return isItemString && item.startsWith(str);
  };

  const inlineStyle: CSSProperties = {};

  if (startsWith('[ERROR]')) inlineStyle.color = colors.error;
  else if (startsWith('[WARN]')) inlineStyle.color = colors.warn;
  else if (startsWith('[INFO]')) inlineStyle.color = colors.info;
  else if (startsWith('[SUCCESS]')) inlineStyle.color = colors.success;

  if (inlineStyle.color) inlineStyle.fontWeight = 600;

  const rendered = isItemString ? item : item();

  return (
    <div ref={ref} key={key}>
      <div className={classNames(...itemStyles)} style={inlineStyle}>
        {rendered}
      </div>
    </div>
  );
};

function StdoutContent() {
  const consoleStdout = getConsoleStdout();
  const { showConsole } = useMainSelector();

  const [stdout, setStdout] = useState<IConsoleStdoutEntry[]>(
    consoleStdout.stdout
  );

  const lastStdout = useRef<HTMLDivElement>(null);

  useEffect(() => {
    consoleStdout.on('update', () => setStdout(consoleStdout.stdout));

    return () => {
      consoleStdout.off('update');
    };
  }, []);

  useEffect(() => {
    if (showConsole && lastStdout.current)
      lastStdout.current.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
        inline: 'end',
      });
  }, [stdout.length]);

  return stdout?.map((item, idx, arr) =>
    renderLine(idx === arr.length - 1 ? lastStdout : null, item, idx)
  );
}

export default function Console({ disabled }: IConsoleProps) {
  const commandManager = getCommandManager();
  const { showConsole } = useMainSelector();
  const dispatch = useDispatch();

  const [savedCommand, setSavedCommand] = useState('');
  const [command, setCommand] = useState('');

  const stdinInput = useRef<HTMLInputElement>(null);

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
          <StdoutContent />
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
            bottom: '20px',
            right: '-102px',
            fontWeight: 600,
            minWidth: 0,
            padding: '10px 28px 8px 24px',
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
