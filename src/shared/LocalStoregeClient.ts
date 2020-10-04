import {typeDefState} from '../redux/initialState';
import {storage} from '../core/utils';
import {storageName} from '../pages/ExcelPage';

export class LocalStorageClient {
    name: string;
    constructor(name: string) {
      this.name = storageName(name);
    }
    save(state: typeDefState) {
      storage(this.name, state);
      return Promise.resolve();
    }

    get() {
      return new Promise((resolve) => {
        const state = storage(this.name);

        setTimeout(() => {
          resolve(state);
        }, 2500);
      });
    }
}
