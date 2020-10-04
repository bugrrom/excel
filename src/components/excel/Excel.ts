import {Header} from '../header/Header';
import {Formula} from '../formula/Formula';
import {Toolbar} from '../toolbar/Toolbar';
import {Table} from '../table/Table';
import {$, Dom} from '../../core/dom';
import {Emitter} from '../../core/Emitter';
import {CreateStore} from '../../core/store/createStore';
import {StoreSubscriber} from '../../core/store/StoreSubscriber';
import {UpdateDate} from '../../redux/action';

type typeComponent =
    (typeof Header| typeof Toolbar| typeof Formula| typeof Table )[]

type typeOptions = {
    component: typeComponent
    store: CreateStore
}

type typeExcel = {
    getRoot: () => Dom
    init: () => void
    destroy: () => void
}

export class Excel implements typeExcel {
    private components: typeComponent;
    newComponents: (Header| Toolbar | Formula | Table)[] | null;
    private emitter: Emitter;
    private store: CreateStore;
    private subscriber: StoreSubscriber;
    constructor( options: typeOptions) {
      this.components = options.component || [];
      this.newComponents = null;
      this.emitter = new Emitter();
      this.store = options.store;
      this.subscriber = new StoreSubscriber(this.store);
    }

    getRoot() {
      const $root = $.create('div', 'excel');
      if (this.components) {
        this.newComponents = this.components.map( (Component) => {
          const $el = $.create('div', Component.className);
          const component = new Component($el, this.emitter, this.store);
          $el.html(component.toHTML());
          $root.append($el);
          return component;
        });
      }
      return $root;
    }

    init() {
      this.store.dispatch(UpdateDate());
      if (this.newComponents) {
        this.subscriber.subscribeComponents(this.newComponents);
        this.newComponents.forEach((component) => component.init());
      }
    }

    destroy() {
      if (this.newComponents) {
        this.subscriber.unsubscribeFromStore();
        this.newComponents.forEach((component) => component.destroy());
      }
    }
}
