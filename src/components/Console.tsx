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
import { getCommandManager } from '@/managers/instance';
import classNames from 'classnames';

const { toggleConsole } = actions.main;
const colors = getColors();

interface IConsoleProps {
  disabled?: boolean;
}

type IStdoutItem = string;

interface IStdoutContentProps {
  stdout: IStdoutItem[];
}

const renderLine = (
  ref: RefObject<HTMLDivElement> | null,
  item: IStdoutItem,
  key: number
) => {
  const itemStyles: classNames.ArgumentArray = [commonStyles.noMar];

  const startsWith = (str: string) => {
    return item.startsWith(str);
  };

  const inlineStyle: CSSProperties = {};

  if (startsWith('[ERROR]')) inlineStyle.color = colors.error;
  else if (startsWith('[WARN]')) inlineStyle.color = colors.warn;
  else if (startsWith('[INFO]')) inlineStyle.color = colors.info;
  else if (startsWith('[SUCCESS]')) inlineStyle.color = colors.success;

  if (inlineStyle.color) inlineStyle.fontWeight = 600;

  return (
    <div ref={ref} key={key}>
      <p className={classNames(...itemStyles)} style={inlineStyle}>
        {item}
      </p>
    </div>
  );
};

function StdoutContent({ stdout }: IStdoutContentProps) {
  const lastStdout = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (lastStdout.current)
      lastStdout.current.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
        inline: 'end',
      });
  }, [stdout]);

  return stdout?.map((item, idx, arr) =>
    renderLine(idx === arr.length - 1 ? lastStdout : null, item, idx)
  );
}

export default function Console({ disabled }: IConsoleProps) {
  const commandManager = getCommandManager();
  const { stdout, showConsole } = useMainSelector();
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
          <StdoutContent stdout={stdout} />
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
