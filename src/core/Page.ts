export class Page {
  params: any;
  constructor(params) {
    this.params = params;
  }
  getRoot() {
    throw new Error('Method "getRoot" should be implemented ');
  }
  afterRender() {

  }

  destroy() {

  }
}
