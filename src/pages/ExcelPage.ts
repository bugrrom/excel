import {Page} from '../core/page/page';
import {CreateStore} from '../core/store/createStore';
import {Formula} from '../components/formula/Formula';
import {normalizeInitialState} from '../redux/initialState';
import {Excel} from '../components/excel/Excel';
import {Header} from '../components/header/Header';
import {rootReducer} from '../redux/rootReducer';
import {Toolbar} from '../components/toolbar/Toolbar';
import {Table} from '../components/table/Table';
import {LocalStorageClient} from '../shared/LocalStoregeClient';
import {StateProcessor} from '../core/page/StateProcessor';


export const storageName = (param: string) => {
  return 'excel:' + param;
};

export class ExcelPage extends Page {
    private excel: Excel | undefined;
    private storeSub: any;
    private processor: StateProcessor;
    constructor(param: string) {
      super(param);
      this.storeSub = null;
      this.processor = new StateProcessor(
          new LocalStorageClient(this.params)
      );
    }
    async getRoot() {
      const state = await this.processor.get();
      const initialState = normalizeInitialState(state);
      const store = new CreateStore(rootReducer, initialState);

      this.storeSub = store.subscribe(this.processor.listen);

      this.excel = new Excel( {
        component: [Header, Toolbar, Formula, Table],
        store,
      });

      return this.excel? this.excel.getRoot() : null;
    }
    afterRender() {
        this.excel?.init();
    }

    destroy() {
        this.excel?.destroy();
        this.storeSub.unsubscribe();
    }
}
