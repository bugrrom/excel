import {ExcelComponent} from './ExcelComponent';
import {defaultStylesType} from '../constants';

export class ExcelStateComponent extends ExcelComponent {
  constructor(...args) {
    super(...args);
  }
  get template() {
    return JSON.stringify(this.state, null, 2);
  }

  initState(state = {}) {
    this.state = {...state};
  }
  setState(newState: defaultStylesType) {
    this.state = {...this.state, ...newState};
    if ('html' in this.$root) {
      this.$root.html(this.template);
    }
  }
}
