import {Dom} from '../../core/dom';
import {Emitter} from '../../core/Emitter';
import {CreateStore} from '../../core/store/createStore';
import {createToolbar} from './toolbar.template';
import {$} from '../../core/dom';
import {ExcelStateComponent} from '../../core/ExcelStateComponent';
import {defaultStyles, typeDefStyles} from '../../constans';
import {IEvent} from '../interface';

export type typeFormula = {
    toHTML: () => void
    storeChanged: (changes: {currentStyles: typeDefStyles}) => void
    onClick: (event: IEvent) => void
}

export type typeInitialState = {
    textAlign: string
    fontWeight: string
    textDecoration: string
    fontStyle: string
}

export class Toolbar extends ExcelStateComponent implements typeFormula {
    static className = 'excel__toolbar'
    constructor($root: Dom, emitter: Emitter, store: CreateStore) {
      super($root, {
        name: 'Toolbar',
        emitter,
        store,
        subscribe: ['currentStyles'],
        listeners: ['click'],
      });
    }

    prepare() {
      this.initState(defaultStyles);
    }

    get template() {
      return createToolbar(this.state);
    }

    toHTML() {
      return this.template;
    }

    storeChanged(changes: {currentStyles: typeDefStyles}) {
      this.setState(changes.currentStyles);
    }

    onClick(event: IEvent) {
      const $target = $(event.target);
      if ($target.data?.type === 'button') {
        if ($target.data.value) {
          const value = JSON.parse($target.data.value);
          const key = Object.keys(value)[0];
          this.$emit('toolbar:applyStyle', value);
          this.setState({[key]: value[key]});
        }
      }
    }
}
