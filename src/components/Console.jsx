import React from 'react';
import { useSelector } from 'react-redux';
import { handleConsoleCommand } from '../util/console';
import consoleStyles from '../assets/Console.module.css';
import commonStyles from '../assets/common.module.css';

export default function Console({ disabled }) {
  const { stdout, commandManager } = useSelector((state) => state);
  const [savedCommand, setSavedCommand] = React.useState('');
  const [command, setCommand] = React.useState('');

  /**
   * @type {React.LegacyRef<HTMLDivElement>}
   */
  const lastStdout = React.useRef(null);

  /**
   * @type {React.LegacyRef<HTMLInputElement>}
   */
  const stdinInput = React.useRef(null);

  /**
   * @type {React.FormEventHandler<HTMLFormElement>}
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!command) return;

    handleConsoleCommand(command);

    setCommand('');
    setSavedCommand('');
  };

  /**
   * @type {React.ChangeEventHandler<HTMLInputElement>}
   */
  const handleInputChange = (e) => {
    setCommand(e.target.value);
    setSavedCommand(e.target.value);
  };

  /**
   * @type {React.KeyboardEventHandler<HTMLInputElement>}
   */
  const handleKeyDown = (e) => {
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
