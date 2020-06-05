import {IEmitter} from '../components/interface';

type listeners = any


export class Emitter implements IEmitter {
    listeners: listeners;
    constructor() {
      this.listeners = {};
    }

    emit(event: string, ...args: any) {
      if (Array.isArray(this.listeners[event])) {
        this.listeners[event].forEach((listener: any) => {
          listener(...args);
        });
      }
    }

    subscribe(event: string, fn: (text: string) => void) {
      this.listeners[event] = this.listeners[event] || [];
      this.listeners[event].push(fn);
      return () => {
        this.listeners[event] =
            this.listeners[event].filter((listener) => listener !== fn);
      };
    }
}
