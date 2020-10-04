import {ExcelComponents} from './ExcelComponents';
import {Dom} from './dom';
import {Emitter} from './Emitter';
import {CreateStore} from './store/createStore';
import {defaultState, typeDefState} from '../redux/initialState';

type typeExcelStateComponent = {
    initState: (initialState: typeDefState) => void
    setState: (newState: { [x: string]: string; }) => void
}

type typeArg = {
    $root: Dom,
    options:
        {
            name?: string,
            listeners?: string[],
            emitter?: Emitter,
            store?: CreateStore,
            subscribe?: string[]
        }
}

export class ExcelStateComponent extends ExcelComponents
  implements typeExcelStateComponent {
  constructor(...args: any) {
    // @ts-ignore
    super(...args);
  }

  get template() {
    return JSON.stringify(this.state, null, 2);
  }

  initState(initialState: typeDefState = defaultState) {
    this.state = {...initialState};
  }

  setState(newState: { [x: string]: string; }) {
    this.state = {...this.state, ...newState};
    this.$root.html(this.template);
  }
}
