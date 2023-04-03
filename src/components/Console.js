import React from 'react';
import { useSelector } from 'react-redux';
import { handleConsoleCommand } from '../util/console';
import '../assets/Console.css';
import '../assets/common.css';

export default function Console() {
  const { stdout } = useSelector((state) => state);
  const [command, setCommand] = React.useState('');

  /**
   * @type {React.LegacyRef<HTMLDivElement>}
   */
  const lastStdout = React.useRef(null);

  React.useEffect(() => {
    if (lastStdout.current)
      lastStdout.current.scrollIntoView({ behavior: 'smooth' });
  }, [stdout]);

  /**
   * @type {React.FormEventHandler<HTMLFormElement>}
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!command) return;

    handleConsoleCommand(command);

    setCommand('');
  };

  /**
   * @type {React.ChangeEventHandler<HTMLInputElement>}
   */
  const handleInputChange = (e) => {
    setCommand(e.target.value);
  };

  return (
    <div className="console">
      <div className="console-stdout">
        {stdout.map((str, idx) => (
          <div ref={idx === stdout.length - 1 ? lastStdout : null} key={idx}>
            <p className="no-mar">{str}</p>
          </div>
        ))}
      </div>

      <div className="console-stdin">
        <form className="console-stdin-form" onSubmit={handleSubmit}>
          <input
            className="stdin-form-input"
            value={command}
            onChange={handleInputChange}
            type="text"
          />
        </form>
      </div>
    </div>
  );
}
