import {Dom} from './dom';
import {capitalize} from './utils';

type typeDom = {
    initDOMListeners: () => void
    removeDOMListener: () => void
}

export class DOMListener implements typeDom {
    $root: Dom;
    listeners: string[];
    name: string | undefined;
    constructor($root: Dom, listeners: string[] = []) {
      if (!$root) {
        throw new Error(`No $root provider for DomListeners`);
      }
      this.$root = $root;
      this.listeners = listeners;
    }

    initDOMListeners(): void {
      this.listeners.forEach( (listener) => {
        const method: string = getMethodName(listener);
        if (!(this as any)[method]) {
          throw new
          Error(`Method ${method} is not implement 
          ${this.name ? this.name : ''} Component`);
        }
        (this as any)[method] = (this as any)[method].bind(this);
        this.$root.on(listener, (this as any)[method]);
      });
    }

    removeDOMListener(): void {
      this.listeners.forEach( (listener) => {
        const method: string = getMethodName(listener);
        this.$root.off(listener, (this as any)[method]);
      });
    }
}

function getMethodName(string: string): string {
  return 'on' + capitalize(string);
}
