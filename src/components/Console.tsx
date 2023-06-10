import React from 'react';
import { handleConsoleCommand } from '@/util/console';
import consoleStyles from '@/assets/Console.module.css';
import commonStyles from '@/assets/common.module.css';
import { useMainSelector } from '@/hooks/useSelector';

interface IConsoleProps {
  disabled?: boolean;
}

export default function Console({ disabled }: IConsoleProps) {
  const { stdout, commandManager } = useMainSelector();
  const [savedCommand, setSavedCommand] = React.useState('');
  const [command, setCommand] = React.useState('');

  const lastStdout = React.useRef<HTMLDivElement>(null);
  const stdinInput = React.useRef<HTMLInputElement>(null);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (!command) return;

    handleConsoleCommand(command);

    setCommand('');
    setSavedCommand('');
  };

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setCommand(e.target.value);
    setSavedCommand(e.target.value);
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (!commandManager) return;

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setCommand(commandManager.getPreviousCommand() || savedCommand);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setCommand(commandManager.getNextCommand() || savedCommand);
    }
  };

  React.useEffect(() => {
    if (lastStdout.current)
      lastStdout.current.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
        inline: 'end',
      });
  }, [stdout]);

  return (
    <div className={`${commonStyles.shadowLight} ${consoleStyles.console}`}>
      <div className={consoleStyles.consoleStdContainer}>
        <div id="console-stdout" className={consoleStyles.consoleStdout}>
          {stdout?.map((str, idx) => (
            <div ref={idx === stdout.length - 1 ? lastStdout : null} key={idx}>
              <p className={commonStyles.noMar}>{str}</p>
            </div>
          ))}
        </div>

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
    </div>
  );
}
