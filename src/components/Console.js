import React from 'react';
import { useSelector } from 'react-redux';
import { handleConsoleCommand } from '../util/console';
import '../assets/Console.css';
import '../assets/common.css';

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
    <div className="shadow-light console">
      <div className="console-std-container">
        <div id="console-stdout" className="console-stdout">
          {stdout.map((str, idx) => (
            <div ref={idx === stdout.length - 1 ? lastStdout : null} key={idx}>
              <p className="no-mar">{str}</p>
            </div>
          ))}
        </div>

        <div className="console-stdin">
          <form className="console-stdin-form" onSubmit={handleSubmit}>
            <input
              ref={stdinInput}
              id="console-stdin-form-input"
              className="stdin-form-input"
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
