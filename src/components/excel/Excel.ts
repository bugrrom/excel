import {$, IDom} from '../../core/dom';
import {Emitter} from '../../core/Emitter';
import {Table} from '../table/Table';
import {Formula} from '../folmula/Formula';
import {Toolbar} from '../toolbar/Toolbar';
import {Header} from '../header/Header';
import {ICreateStore} from '../../core/createStore';
import {StoreSubscriber} from '../../core/StoreSubscriber';
import {updateDate} from '../../redux/action';


// eslint-disable-next-line no-undef

interface IExcel {
    getRoot: () => IDom,
    init: () => void
    destroy: () => void
}

export class Excel implements IExcel {
    store: ICreateStore;
    emitter: Emitter;
    components: ( Header | Toolbar | Formula | Table)[];
    private subscriber: StoreSubscriber;
    constructor(
        options: {
            components: (Header | Toolbar | Formula | Table)[],
            store: ICreateStore }) {
      this.components = options.components || [];
      this.store= options.store;
      this.emitter = new Emitter();
      this.subscriber = new StoreSubscriber(this.store);
    }

    getRoot() {
      const $root = $.create('div', 'excel');
      const componentOptions = {
        emitter: this.emitter,
        store: this.store,
      };
      this.components = this.components.map((Component) => {
        const $el = $.create('div', Component.className);
        const component = new Component($el, componentOptions);
        $el.html(component.toHTML());
        $root.append($el);
        return component;
      });
      return $root;
    }

    init() {
      this.store.dispatch(updateDate());
      this.subscriber.subscribeComponents(this.components);
      this.components.forEach((component) => component.init());
    }
    destroy() {
      this.subscriber.unsubscribeFromStore();
      this.components.forEach((component) => component.destroy());
    }
}
