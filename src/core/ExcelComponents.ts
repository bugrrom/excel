import {DOMListener} from './DOMListener';
import {Dom} from './dom';
import {Emitter} from './Emitter';
import {CreateStore} from './store/createStore';
import {typeExcelAction} from '../redux/types';

type typeExcelComponent = {
  $dispatch: (action: typeExcelAction) => void
  isWatching: (key: string) => boolean
  $emit: (event: string, ...arg: any) => void
  $on: (event: string, fn : (...arg: any) => void) => void
  init: () => void
  destroy: () => void
}

export class ExcelComponents extends DOMListener implements typeExcelComponent {
  state: any
  name: string |undefined
  emitter: Emitter | undefined;
  private unsubscribers: any[];
  protected store: CreateStore | undefined;
  private storeSub: { unsubscribe(): void; listener: any[] } | undefined | null;
  private subscribe: string[];
  constructor(
      $root: Dom,
      options:
          {
            name?: string,
            listeners?: string[],
            emitter?: Emitter,
            store?: CreateStore,
            subscribe?: string[]
          } = {}) {
    super($root, options.listeners);
    this.name = options.name || '';
    this.emitter = options.emitter;
    this.unsubscribers = [];
    this.store = options.store;
    this.subscribe = options.subscribe || [];
    this.prepare();
  }

  prepare() {}

  $dispatch(action: typeExcelAction) {
    this.store?.dispatch(action);
  }

  isWatching(key: string) {
    return this.subscribe.includes(key);
  }

  $emit(event: string, ...arg: any) {
    this.emitter?.emit(event, ...arg);
  }

  $on(event: string, fn : (...arg: any) => void) {
    const unsub = this.emitter?.subscribe(event, fn);
    this.unsubscribers.push(unsub);
  }

  init() {
    this.initDOMListeners();
  }

  destroy() {
    this.removeDOMListener();
    this.unsubscribers.forEach((unsub) => unsub());
    this.storeSub?.unsubscribe();
  }
}
