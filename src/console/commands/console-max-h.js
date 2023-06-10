import Command from '@/classes/Command';
import { consolePrint } from '../console';

export default class ConsoleMaxHCommand extends Command {
  constructor() {
    super('console-max-h');
    this.currentMaxHeight = 100;
    this.subtract100 = 88;
  }

  run(args) {
    if (!args) {
      return consolePrint('max height: ' + this.currentMaxHeight);
    }

    const newH = Number(args);
    if (isNaN(newH) || newH < 0 || newH > 100) {
      return consolePrint('[ERROR] Invalid [number]');
    }

    if (newH >= 0 && newH <= 100) {
      consolePrint('max height set to ' + newH);

      /**
       * @type {HTMLDivElement}
       */
      const el = document.querySelector('#console-stdout');

      return this.setMaxH(el, newH);
    }
  }

  setMaxH(el, h) {
    this.currentMaxHeight = h;
    el.style.maxHeight = `calc(${h}vh - ${(this.subtract100 / 100) * h}px)`;
  }
}
