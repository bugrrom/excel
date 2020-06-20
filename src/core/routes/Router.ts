import {$, IDom} from '../dom';
import {ActiveRoute} from './ActiveRoute';
export class Router {
    $placeholder: IDom;
    routes: any;
    page: any
    constructor(selector: string, routes : any) {
      if (!selector) {
        throw new Error('selector is not provider in Router');
      }
      this.$placeholder = $(selector);
      this.routes = routes;
      this.page = null;
      this.changePageHandler = this.changePageHandler.bind(this);
      this.init();
    }

    init() {
      window.addEventListener('hashchange', this.changePageHandler);
      this.changePageHandler();
    }

    changePageHandler() {
      if (this.page) {
        this.page.destroy();
      }
      this.$placeholder.clear();
      const Page = ActiveRoute.path.includes('excel') ?
          this.routes.excel : this.routes.dashboard;
      this.page = new Page(ActiveRoute.param);
      this.$placeholder.append(this.page.getRoot());

      this.page.afterRender();
    }

    destroy() {
      window.removeEventListener('hashchange', this.changePageHandler);
    }
}