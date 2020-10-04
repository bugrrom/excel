export class Emitter {
    listeners: [];
    constructor() {
      this.listeners = [];
    }
    emit(event: string, ...arg: (number|string)[]) {
      if (!Array.isArray((this as any).listeners[event])) {
        return false;
      }
      (this as any).listeners[event]
          .forEach((listener: (...arg: (number|string)[]) => void) => {
            listener(...arg);
          });
    }
    subscribe(event: string, fn: <T>(...arg: T[]) => void) {
      (this as any).listeners[event] = (this as any).listeners[event] || [];
      (this as any).listeners[event].push(fn);
      return () => {
        (this as any).listeners[event] =
                (this as any).listeners[event]
                    .filter((listener: ()=> void) => listener !==fn);
      };
    }
}

