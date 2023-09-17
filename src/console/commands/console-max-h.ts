import Command from '@/classes/Command';
import { consolePrint } from '../console';
import { CONSOLE_MARGIN_TOP } from '@/configs/constants';

export default class ConsoleMaxHCommand extends Command {
  currentMaxHeight: number;
  marginTop: number;

  constructor() {
    super('console-max-h');
    this.currentMaxHeight = 100;
    this.marginTop = CONSOLE_MARGIN_TOP;
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
      el.style.maxHeight = `calc(${h}vh - ${(this.marginTop / 100) * h}px)`;
  }
}
