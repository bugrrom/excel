type PageType = {
  getRoot: () => void
  afterRender: () => void
  destroy: () => void
}

export class Page implements PageType{
  params: any;
  constructor(params: any) {
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
