import {$, Dom} from '../dom';
import {ActiveRoute} from './ActiveRoute';
import {Loader} from '../../components/Loader';

export class Router {
    $placeholder: Dom;
    routes: any;
    page: any
    private loader: Dom | string | undefined
    constructor(selector: string, routes : any) {
      if (!selector) {
        throw new Error('selector is not provider in Router');
      }
      this.$placeholder = $(selector);
      this.routes = routes;
      this.page = null;
      this.loader = Loader();
      this.changePageHandler = this.changePageHandler.bind(this);
      this.init();
    }

    init() {
      window.addEventListener('hashchange', this.changePageHandler);
      this.changePageHandler();
    }

    async changePageHandler() {
      if (this.page) {
        this.page.destroy();
      }
      this.$placeholder.clear().append(this.loader);
      const Page = ActiveRoute.path.includes('excel') ?
            this.routes.excel : this.routes.dashboard;
      this.page = new Page(ActiveRoute.param);

      const root = await this.page.getRoot();

      this.$placeholder.clear().append(root);

      this.page.afterRender();
    }

    destroy() {
      window.removeEventListener('hashchange', this.changePageHandler);
    }
}
