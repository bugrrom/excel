import {capitalize} from './utils';
import {IDom} from './dom';

interface IDomListener {
    initDomListeners: () => void
    removeDomListeners: () => void
}

export class DOMListener implements IDomListener {
    $root: HTMLElement | Element | IDom;
    listeners: string[];
    name: string | undefined;
    constructor($root: HTMLElement | Element | IDom, listeners: string[] = []) {
      if (!$root) {
        throw new Error('No $root provided for DonListener');
      }

      this.$root = $root;
      this.listeners = listeners;
    }

    initDomListeners(): void {
      this.listeners.forEach((listener) => {
        const method = getMethodName(listener);
        if (!this[method]) {
          throw new Error(`Method ${method} is not implemented in ${this.name || ''} Component`);
        }
        this[method] = this[method].bind(this);
        if ('on' in this.$root && this.$root.on) {
          this.$root.on(listener, this[method].bind(this));
        }
      });
    }
    removeDomListeners(): void {
      this.listeners.forEach( (listener) => {
        const method = getMethodName(listener);
        if ('off' in this.$root) {

          this.$root.off(listener, this[method]);
        }
      });
    }
}
function getMethodName(eventName:string): string {
  return 'on' + capitalize(eventName);
}
