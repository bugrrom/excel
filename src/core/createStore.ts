import {actionType} from '../redux/rootReducer';
import {iDefaultState} from '../redux/initialState';

export type subscribe = {
    unsubscribe: ()=> void,
    listeners: []
}

export interface ICreateStore {
    subscribe: (fn: () => void) =>
        { listeners: (() => void)[]; unsubscribe(): void; }
    dispatch: (action: actionType) => void
    getState: () => void
}

export class createStore implements ICreateStore {
    private listeners: (() => void)[];
    private state: iDefaultState;
    private rootReducer: (state: iDefaultState, action: actionType) => {};
    constructor(rootReducer: (state: iDefaultState, action: actionType) => {},
        initialState = {}) {
      this.state = rootReducer({...initialState}, {type: '_INIT_'});
      this.listeners = [];
      this.rootReducer = rootReducer;
    }
    subscribe(fn: ()=>void) {
      this.listeners.push(fn);
      return {
        listeners: this.listeners,
        unsubscribe() {
          this.listeners = this.listeners.filter((l) => l!== fn);
        },
      };
    }
    dispatch(action: actionType) {
      this.state = this.rootReducer(this.state, action);
      this.listeners.forEach((l: (state: iDefaultState)=>void) => l(this.state));
    }
    getState() {
      return JSON.parse(JSON.stringify(this.state));
    }
}
