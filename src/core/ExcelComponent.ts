import {DOMListener} from './DOMListener';
import {IEmitter, IOptional} from '../components/interface';


interface IExcelComponent {
  toHTML: () => string,
  init: () => void,
  destroy: () => void,
  prepare: () => void
  $emit: (event: string, ...arg: string[]) => void
}

export class ExcelComponent extends DOMListener implements IExcelComponent {
  name: string | undefined;
  protected emitter: IEmitter;
  private unsunbscribers: (()=>void)[];
  constructor($root: HTMLElement | Element, options: IOptional) {
    super($root, options.listeners);
    this.name = options.name;
    this.emitter = options.emitter;
    this.unsunbscribers = [];
    this.prepare();
  }

  prepare() {

  }

  $emit(event: string, ...arg: string[]) {
    this.emitter.emit(event, ...arg);
  }

  $on(event: string, fn: (text: string) => void) {
    const unsub = this.emitter.subscribe(event, fn);
    this.unsunbscribers.push(unsub);
  }

  toHTML() {
    return '';
  }

  init() {
    this.initDomListeners();
  }

  destroy() {
    this.removeDomListeners();
    this.unsunbscribers.forEach((unsub) => unsub());
  }
}
