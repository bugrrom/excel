import {capitalize} from './utils';

export class DOMListener {
    $root: any;
    listeners: string[];
    constructor($root: HTMLElement, listeners: string[] = []) {
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
          // eslint-disable-next-line max-len
          throw new Error(`Method ${method} is not implemented in ${this.name || ''} Component`);
        }
        this[method] = this[method].bind(this);
        this.$root.on(listener, this[method].bind(this));
      });
    }

    removeDomListeners(): void {
      this.listeners.forEach( (listener) => {
        const method = getMethodName(listener);
        this.$root.off(listener, this[method]);
      });
    }
}
function getMethodName(eventName:string): string {
  return 'on' + capitalize(eventName);
}
