import Command from '@/classes/Command';
import { consolePrint } from '../console';

export default class ConsoleMaxHCommand extends Command {
  currentMaxHeight: number;
  subtract100: number;

  constructor() {
    super('console-max-h');
    this.currentMaxHeight = 100;
    this.subtract100 = 88;
  }

  run(args: string) {
    if (!args) {
      return consolePrint('max height: ' + this.currentMaxHeight);
    }

    const newH = Number(args);
    if (isNaN(newH) || newH < 0 || newH > 100) {
      return consolePrint('[ERROR] Invalid [number]');
    }

    if (newH >= 0 && newH <= 100) {
      consolePrint('max height set to ' + newH);

      const el = document.querySelector('#console-stdout');

      return this.setMaxH(el as HTMLDivElement, newH);
    }
  }

  setMaxH(el: HTMLDivElement | null, h: number) {
    this.currentMaxHeight = h;

    if (el)
      el.style.maxHeight = `calc(${h}vh - ${(this.subtract100 / 100) * h}px)`;
  }
}
