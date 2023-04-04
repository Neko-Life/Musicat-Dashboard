import Command from '../../classes/Command';
import { consolePrint } from '../console';

export default class ConsoleMaxHCommand extends Command {
  constructor() {
    super('console-max-h');
    this.currentMaxHeight = 100;
  }

  run(args) {
    /**
     * @type {HTMLDivElement}
     */
    const el = document.querySelector('#console-stdout');

    const newH = args ? Number(args) : NaN;
    if (isNaN(newH) || newH < 0 || newH > 100) {
      return consolePrint('[ERROR] Invalid [number]');
    }

    if (newH >= 0 && newH <= 100) {
      consolePrint('max height set to ' + newH);
      return this.setMaxH(el, newH);
    }

    consolePrint('max height: ' + this.currentMaxHeight);
  }

  setMaxH(el, h) {
    this.currentMaxHeight = h;
    el.style.maxHeight = `calc(${h}vh - 88px)`;
  }
}
