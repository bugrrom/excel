import {$, IDom} from '../../core/dom';
import {Emitter} from '../../core/Emitter';
import {Table} from '../table/Table';
import {Formula} from '../folmula/Formula';
import {Toolbar} from '../toolbar/Toolbar';
import {Header} from '../header/Header';
import {ICreateStore} from '../../core/createStore';
import {StoreSubscriber} from "../../core/StoreSubscriber";


// eslint-disable-next-line no-undef

interface IExcel {
    getRoot: () => IDom,
    render: () => void
}

export class Excel implements IExcel {
    store: ICreateStore;
    $el: IDom;
    emitter: Emitter;
    components: ( Header | Toolbar | Formula | Table)[];
    private subscriber: StoreSubscriber;
    constructor(selector: string,
        options: {
            components: (Header | Toolbar | Formula | Table)[],
            store: ICreateStore }) {
      this.$el = $(selector);
      this.components = options.components || [];
      this.store= options.store;
      this.emitter = new Emitter();
      this.subscriber = new StoreSubscriber(this.store);
    }

    getRoot() {
      const $root = $.create('div', 'excel');
      const componentOptions = {
        emitter: this.emitter,
        store: this.store
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

    render() {
      if (this.$el) {
        this.$el.append(this.getRoot());
        this.subscriber.subscribeComponents(this.components)
        this.components.forEach((component) => component.init());
      }
    }
    destroy() {
      this.subscriber.unsubscribeFromStore()
      this.components.forEach((component) => component.destroy());
    }
}
