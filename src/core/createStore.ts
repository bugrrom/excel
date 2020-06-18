import {actionType, stateType} from '../redux/rootReducer';

type subscribe = {
    unsubscribe: ()=> void
}

export interface ICreateStore {
    subscribe: (fn: (state: stateType) => void) => subscribe
    dispatch: (action: actionType) => void
    getState: () => void
}

export class createStore implements ICreateStore {
    private listeners: (() => void)[];
    private state: stateType;
    private rootReducer: (state: stateType, action: actionType) => {};
    constructor(rootReducer: (state: stateType, action: actionType) => {},
        initialState ={}) {
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
      this.listeners.forEach((l: (state: stateType)=>void) => l(this.state));
    }
    getState() {
      return JSON.parse(JSON.stringify(this.state));
    }
}
