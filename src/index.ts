import {Excel} from './components/excel/Excel';
import {Header} from './components/header/Header';
import {Toolbar} from './components/toolbar/Toolbar';
import {Formula} from './components/folmula/Formula';
import {Table} from './components/table/Table';
import './scss/index.scss';
import {createStore} from './core/createStore';
import {rootReducer, stateType} from './redux/rootReducer';
import {debounce, storage} from './core/utils';
import {initialState} from './redux/initialState';

// eslint-disable-next-line new-cap
const store = new createStore(rootReducer, initialState);

const stateListener = debounce((state) => {
  console.log('state', state)
  storage('excel-state', state);
}, 300)

store.subscribe(stateListener)

const excel = new Excel('#app', {
  components: [Header, Toolbar, Formula, Table],
  store,
});

excel.render();
