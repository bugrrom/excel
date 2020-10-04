import {typeExcelAction} from '../../redux/types';
import {defaultState, typeDefState} from '../../redux/initialState';

export class CreateStore {
    private state: typeDefState ;
    private listener: ((arg?: any)=> void)[];
    private rootReducer:
        (initialState: typeDefState, action: typeExcelAction) => typeDefState;
    constructor(
        rootReducer:
            (initialState: typeDefState, action: typeExcelAction)
                => typeDefState,
        initialState = defaultState) {
      this.state = initialState;
      this.listener = [];
      this.rootReducer = rootReducer;
    }
    subscribe(fn: (arg?: any)=> void) {
      this.listener.push(fn);
      return {
        listener: this.listener,
        unsubscribe() {
          this.listener = this.listener.filter((l) => l !== fn);
        },
      };
    }
    dispatch(action: typeExcelAction) {
      this.state = this.rootReducer(this.state, action);
      this.listener.forEach((listener) => listener(this.state));
    }

    getState(): typeDefState {
      return JSON.parse(JSON.stringify(this.state));
    }
}
