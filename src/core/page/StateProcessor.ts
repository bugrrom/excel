import {debounce} from '../utils';
import {typeDefState} from '../../redux/initialState';

export class StateProcessor {
    client: any;
    constructor(client: any, delay = 300) {
      this.client = client;
      this.listen = debounce(this.listen.bind(this), delay);
    }
    listen(state: typeDefState) {
      this.client.save(state);
    }

    get() {
      return this.client.get();
    }
}
