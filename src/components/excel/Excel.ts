import {$} from '../../core/dom';

type Options = {
    components: components
}

// eslint-disable-next-line no-undef
type components = Array<any>

export class Excel {
    components: components;
    $el: any;
    constructor(selector: string, options: Options) {
      this.$el = $(selector);
      this.components = options.components || [];
    }

    getRoot() {
      const $root = $.create('div', 'excel');
      this.components = this.components.map((Component) => {
        const $el = $.create('div', Component.className);
        const component = new Component($el);
        $el.html(component.toHTML());
        $root.append($el);
        return component;
      });
      return $root;
    }

    render() {
      if (this.$el) {
        this.$el.append(this.getRoot());
        this.components.forEach((component) => component.init());
      }
    }
}
