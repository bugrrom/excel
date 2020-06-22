import {Page} from '../core/Page';
import {rootReducer} from '../redux/rootReducer';
import {normalizeInitialState} from '../redux/initialState';
import {debounce, storage} from '../core/utils';
import {createStore} from '../core/createStore';
import {Excel} from '../components/excel/Excel';
import {Header} from '../components/header/Header';
import {Toolbar} from '../components/toolbar/Toolbar';
import {Formula} from '../components/folmula/Formula';
import {Table} from '../components/table/Table';

function storageName(param: string) {
  return 'excel:' + param;
}

type ExcelPageType = {
  getRoot: () => void
  afterRender: () => void
  destroy: () => void
}

export class ExcelPage extends Page implements ExcelPageType {
  excel: Excel | undefined;
  getRoot() {
    const params = this.params ? this.params : Date.now().toString();
    const state = storage(storageName(params));
    // eslint-disable-next-line new-cap
    const store = new createStore(rootReducer, normalizeInitialState(state));
    const stateListener = debounce((state) => {
      storage(storageName(params), state);
    }, 300);

    store.subscribe(stateListener);

    this.excel = new Excel( {
      components: [Header, Toolbar, Formula, Table],
      store,
    });

    return this.excel.getRoot();
  }
  afterRender() {
    if (this.excel) {
      this.excel.init();
    }
  }
  destroy() {
    if (this.excel) {
      this.excel.destroy();
    }
  }
}
