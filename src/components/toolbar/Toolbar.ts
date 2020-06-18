import {IEvent, IOptional} from '../interface';
import {createToolbar} from './toolbar.template';
import {$} from '../../core/dom';
import {ExcelStateComponent} from '../../core/ExcelStateComponent';
import {initialState} from "../../constants";

interface IToolbar {
  toHTML: () => string
}

export class Toolbar extends ExcelStateComponent implements IToolbar {
  static className = 'excel__toolbar';
  constructor($root: HTMLElement | Element, options: IOptional) {
    super($root, {
      name: 'Toolbar',
      listeners: ['click'],
      ...options,
      subscribe: ['currentStyles'],
    });
  }

  prepare() {
    this.initState(initialState);
  }

  get template() {
    return createToolbar(this.state);
  }

  toHTML(): string {
    return this.template;
  }

  storeChanged(changes) {
    this.setState(changes.currentStyles)
  }

  onClick(event: IEvent) {
    const $target = $(event.target);
    if ($target.data) {
      if ( $target.data.type === 'button') {
        if ('value' in $target.data){
          const value = JSON.parse(<string>$target.data.value);
          this.$emit('toolbar:applyStyle', value);
        }
      }
    }
  }
}
