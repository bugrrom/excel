import {CreateStore} from './createStore';
import {isEqual} from '../utils';
import {} from '../../redux/rootReducer';
import {typeDefState} from '../../redux/initialState';

export class StoreSubscriber {
    private store: CreateStore;
    private sub: any;
    private prevState: typeDefState | null;
    constructor(store: CreateStore) {
      this.store = store;
      this.sub = null;
      this.prevState = null;
    }

    subscribeComponents<T>(components: T[]) {
      this.prevState = this.store.getState();
      this.sub = this.store.subscribe((state) => {
        Object.keys(state).forEach((key) => {
          if (!isEqual(this.prevState ?
              (this.prevState as any)[key] :
              null, state[key])) {
            components.forEach((component)=> {
              // @ts-ignore
              if (component.isWatching(key)) {
                const change = {[key]: state[key]};
                // @ts-ignore
                component.storeChanged(change);
              }
            });
          }
        });
        this.prevState = this.store.getState();
      });
    }

    unsubscribeFromStore() {
      this.sub.unsubscribe();
    }
}
