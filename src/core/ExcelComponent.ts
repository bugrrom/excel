import {DOMListener} from './DOMListener';
import {IEmitter, IOptional} from '../components/interface';
import {IDom} from './dom';
import {ICreateStore} from './createStore';
import {actionType} from '../redux/rootReducer';


interface IExcelComponent {
  toHTML: () => string,
  init: () => void,
  destroy: () => void,
  prepare: () => void
  $emit: (event: string, ...arg: string[]) => void
  $dispatch: (action: actionType) => void
}

export class ExcelComponent extends DOMListener implements IExcelComponent {
  name: string | undefined;
  protected emitter: IEmitter;
  private unsunbscribers: (()=>void)[];
  private store: ICreateStore;
  private subscribe: any;
  constructor($root: HTMLElement | Element | IDom, options: IOptional) {
    super($root, options.listeners);
    this.name = options.name;
    this.emitter = options.emitter;
    this.unsunbscribers = [];
    this.store = options.store;
    this.subscribe = options.subscribe || [];
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

  $dispatch(action: actionType) {
    this.store.dispatch(action);
  }


  toHTML() {
    return '';
  }



  init() {
    this.initDomListeners();
  }

  isWatching(key: string) {
    return this.subscribe.includes(key);
  }

  destroy() {
    this.removeDomListeners();
    this.unsunbscribers.forEach((unsub) => unsub());
  }
}
