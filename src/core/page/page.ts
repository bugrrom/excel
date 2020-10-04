export class Page {
  params: string;
  constructor(params: string) {
    this.params = params || Date.now().toString();
  }

  getRoot() {
    throw new Error('Method "getRoot" should be implemented');
  }

  afterRender() {}

  destroy() {}
}
