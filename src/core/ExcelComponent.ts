import {DOMListener} from './DOMListener';
interface IOptional {
  name: string,
  listeners: string[]
}

interface IExcelComponent {
  name: string,
  toHTML: () => string,
  init: () => void,
  destroy: () => void
}

export class ExcelComponent extends DOMListener implements IExcelComponent{
  name: string;
  constructor($root: HTMLElement, options: IOptional);
  constructor($root: HTMLElement, options: IOptional = {}) {
    super($root, options.listeners);
    this.name = options.name;
  }

  toHTML() {
    return '';
  }

  init() {
    this.initDomListeners();
  }

  destroy(){
    this.removeDomListeners();
  }
}