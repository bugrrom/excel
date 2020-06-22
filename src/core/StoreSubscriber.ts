import {ICreateStore, subscribe} from './createStore';
import {isEqual} from './utils';

interface IStoreSubscriber {
    subscribeComponents: (components: any) => void
    unsubscribeFromStore: () => void
}

export class StoreSubscriber implements IStoreSubscriber{
    private sub: subscribe| null;
    private store: ICreateStore;
    private prevState: ICreateStore | void | {};
    constructor(store: ICreateStore) {
      this.store = store;
      this.sub = null;
      this.prevState = {};
    }

    subscribeComponents(components: any) {
      this.prevState = this.store.getState();
      this.sub = this.store.subscribe((state) => {
        Object.keys(state).forEach((key) => {
          if (!isEqual(this.prevState[key], state[key])) {
            components.forEach((component) => {
              if (component.isWatching(key)) {
                const changes = {[key]: state[key]};
                component.storeChanged(changes);
              }
            });
          }
        });
        this.prevState = this.store.getState();
      });
    }

    unsubscribeFromStore() {
      if (this.sub) {
        this.sub.unsubscribe();
      }
    }
}
